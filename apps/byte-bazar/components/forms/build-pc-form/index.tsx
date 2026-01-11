"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, Label } from "@workspace/ui/components/";
import {
  redirect,
  usePathname,
  useRouter,
  /* useRouter, */
  useSearchParams,
} from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Trash } from "../../../../../packages/ui/src/lib";
import useProducts from "../../../lib/hooks/useProducts";
import { useBuilderStore, useCategoriesStore } from "../../../lib/store";
import { Product } from "../../../lib/types";
import { ProductHelper } from "../../../lib/utils/productHelper";
import ZodHelper from "../../../lib/utils/zodHelper";
import ProductCard from "../../items-cards/product-card";

const customPCOrder: Record<string, number> = {
  cpu: 1,
  motherboard: 2,
  ram: 3,
  storage: 4,
  gpu: 5,
  powerSupply: 6,
  case: 7,
  //'accessories': 8,
};

const BuildPcForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    builderState,
    totalPrice,
    setComponent,
    replaceComponent,
    removeComponent,
    clearAll,
    getComponentByShortId,
  } = useBuilderStore();
  const { categories } = useCategoriesStore();

  const [continueStep, setContinueStep] = useState(0);
  const [step, setStep] = useState(0);
  const hasHydrated = useRef(false);

  const categoriesNames = useMemo(
    () => categories?.map((category) => category.name.toLowerCase()),
    [categories]
  );

  const sortedCategories = useMemo(() => {
    if (!categories) return [];
    return [...categories].sort(
      (a, b) =>
        customPCOrder[a.name.toLowerCase()]! -
        customPCOrder[b.name.toLowerCase()]!
    );
  }, [categories]);

  const { data: products, isLoading } = useProducts({
    page: undefined,
    sizePage: undefined,
    filter: { category: sortedCategories[step]?.id },
  });

  const customPcSchema = ZodHelper.createPcSchema(categoriesNames);

  type CustomPcSchema = z.infer<typeof customPcSchema>;

  const form = useForm<CustomPcSchema>({
    resolver: zodResolver(customPcSchema),
    defaultValues: {} as CustomPcSchema,
  });

  const onSubmit = (data: CustomPcSchema) => {
    clearAll();
    console.warn(data);
    redirect("/checkout/preview");
  };

  const updateParams = useCallback((): void => {
    const newParams = new URLSearchParams();
    newParams.set("step", step.toString());
    const entries: Record<string, string | undefined> = form.getValues();

    for (const [key, value] of Object.entries(entries)) {
      if (value && typeof value === "string" && value.length > 0) {
        const shortID = ProductHelper.shortenId(value as string);
        const shortCat = key.slice(0, 3).toLowerCase();
        newParams.set(shortCat, shortID as string);
      }
    }

    const currentParams = new URLSearchParams(searchParams);
    const currentParamsString = currentParams.toString();
    const newParamsString = newParams.toString();
    if (newParamsString !== currentParamsString) {
      window.history.replaceState(
        {},
        "",
        `${pathname}?${newParams.toString()}`
      );
    }
  }, [form, pathname, searchParams, step]);

  //Hydration from URL params
  useEffect(() => {
    if (!categories || hasHydrated.current) return;
    if (!categories) return;

    const params = new URLSearchParams(searchParams);
    const formValues: Record<string, string> = {};

    params.forEach((shortId, shortCat) => {
      if (shortCat === "step") {
        const newStep = Number(shortId);
        if (newStep !== step) {
          setStep(newStep);
        }
        return;
      }

      const cat = categories?.find((category) =>
        category.name.toLowerCase().startsWith(shortCat)
      );
      const fullId = getComponentByShortId(shortId);

      if (cat && fullId) {
        formValues[cat.name.toLowerCase()] = fullId;
      } else {
        console.warn("ID not found for shortId:", shortId);
      }
    });

    //Hydrate form
    if (Object.keys(formValues).length > 0) {
      form.reset(formValues);
    }
    updateParams();
    hasHydrated.current = true;
  }, [categories, form, getComponentByShortId, updateParams, searchParams]);

  useEffect(() => {
    if (builderState.length === 0) {
      setStep(0);
    }
  }, [builderState]);

  useEffect(() => {
    updateParams();
  }, [step, updateParams]);

  if (!categories) return <div>Loading...</div>;

  const handleSelectItem = (productId: string, price: number) => {
    const catKey = sortedCategories[step]!.name.toLowerCase();
    const currentId = form.getValues()[catKey];

    if (currentId && currentId !== productId) {
      replaceComponent(currentId, productId, price);
    } else {
      setComponent(catKey, productId, price);
    }

    form.setValue(catKey, productId);
    if (continueStep != 0) {
      setStep(continueStep);
      setContinueStep(0);
      return;
    }
    updateParams();
    nextStep();
  };

  const handleRemoveItem = (step: number) => {
    const catKey = sortedCategories[step]!.name.toLowerCase();
    const currentId = form.getValues()[catKey];

    if (currentId) {
      removeComponent(currentId);

      form.setValue(catKey, "");
      updateParams();
    }
  };

  const handleResetForm = () => {
    clearAll();
    form.reset({});
    setStep(0);

    const newParams = new URLSearchParams();
    newParams.set("step", step.toString());
    window.history.replaceState({}, "", `${pathname}?${newParams.toString()}`);
  };

  const nextStep = () => {
    setStep(step < sortedCategories.length - 1 ? step + 1 : step);
  };

  if (!categories) return <div>Loading...</div>;
  return (
    <div>
      <Card className="h-20 border rounded-md mx-4">
        <CardContent className="flex justify-between">
          <Label>SubTotal: {totalPrice.toFixed(2)}</Label>
          <Button onClick={handleResetForm}>Vaciar</Button>
          <Button type="submit" form="builderPcForm">
            Comprar
          </Button>
        </CardContent>
      </Card>
      <div className="w-full my-5  grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        <section className="border p-2 rounded-md col-span-1">
          {sortedCategories.map((category, idx: number) => (
            <div
              key={category.id}
              className={
                "p-4 border mb-4 rounded-md" +
                (step === idx
                  ? " border-gray-200"
                  : form.watch(category.name.toLowerCase())
                    ? " border-green-500"
                    : "")
              }
              onClick={() => setStep(idx)}
            >
              <Label className="text-2xl font-bold mb-2">{category.name}</Label>
              {form.watch(category.name.toLowerCase()) && (
                <div className="flex justify-end">
                  <Trash onClick={() => handleRemoveItem(idx)} />
                </div>
              )}
            </div>
          ))}
        </section>
        <form
          id="builderPcForm"
          className="col-span-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="border p-4  mb-4 rounded-md grid grid-cols-2 gap-3">
            {!isLoading && products && products.data ? (
              (products.data as unknown as Product[]).map(
                (product: Product) => {
                  return (
                    <ProductCard
                      key={product.id}
                      data={product}
                      onSelect={handleSelectItem}
                    />
                  );
                }
              )
            ) : (
              <div>Loading products...</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuildPcForm;
