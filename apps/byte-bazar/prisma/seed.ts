import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "../app/generated/prisma";
import { uploadImage } from "../lib/services/cloudinary";
import { Brand, Category, Product } from "../lib/types";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const prisma = new PrismaClient();

const initBrands: Brand[] = [
  // Marcas originales
  {
    name: "INTEL",
    logo: path.join(appRoot, "public/seedImages/brands/AMD.svg") as string,
  },
  {
    name: "AMD",
    logo: path.join(appRoot, "public/seedImages/brands/Intel.png") as string,
  },
  {
    name: "Gigabyte",
    logo: path.join(appRoot, "public/seedImages/brands/gigabyte.png") as string,
  },
  {
    name: "NVIDIA",
    logo: "",
  },
  {
    name: "ASUS",
    logo: "",
  },
  {
    name: "MSI",
    logo: "",
  },
  {
    name: "Corsair",
    logo: "",
  },
  {
    name: "Samsung",
    logo: "",
  },
  {
    name: "Western Digital",
    logo: "",
  },
  {
    name: "Seagate",
    logo: "",
  },
  {
    name: "Kingston",
    logo: "",
  },
  {
    name: "Logitech",
    logo: "",
  },

  // Marcas adicionales para completar los productos
  {
    name: "NZXT",
    logo: "",
  },
  {
    name: "Lian Li",
    logo: "",
  },
  {
    name: "Fractal Design",
    logo: "",
  },
  {
    name: "Cooler Master",
    logo: "",
  },
  {
    name: "be quiet!",
    logo: "",
  },
  {
    name: "Phanteks",
    logo: "",
  },
  {
    name: "Thermaltake",
    logo: "",
  },
  {
    name: "EVGA",
    logo: "",
  },
  {
    name: "Seasonic",
    logo: "",
  },
  {
    name: "G.Skill",
    logo: "",
  },
  {
    name: "Crucial",
    logo: "",
  },
  {
    name: "Team Group",
    logo: "",
  },
  {
    name: "Patriot",
    logo: "",
  },
  {
    name: "ADATA",
    logo: "",
  },
];

const initCategories: Category[] = [
  {
    name: "CPU",
    slug: "cpu",
    imageUrl: path.join(appRoot, "public/seedImages/categories/cpu.svg"),
  },
  {
    name: "GPU",
    slug: "gpu",
    imageUrl: path.join(appRoot, "public/seedImages/categories/gpu.svg"),
  },
  {
    name: "Motherboard",
    slug: "motherboard",
    imageUrl: path.join(
      appRoot,
      "public/seedImages/categories/motherboard.svg"
    ),
  },
  {
    name: "Case",
    slug: "case",
    imageUrl: path.join(appRoot, "public/seedImages/categories/case.svg"),
  },
  {
    name: "Power Supply",
    slug: "power-supply",
    imageUrl: path.join(
      appRoot,
      "public/seedImages/categories/power-supply.svg"
    ),
  },
  {
    name: "Ram",
    slug: "ram",
    imageUrl: path.join(appRoot, "public/seedImages/categories/ram.svg"),
  },
];

const initProducts: Product[] = [
  {
    name: "Ryzen 7 7800x3d",
    slug: "ryzen-7-7800x3d",
    sku: "AMD-CPU-7800X3D",
    description: "Ryzen 7 7800g processor",
    brandName: "AMD",
    categoryName: "CPU",
    price: 449.99,
    images: [
      path.join(appRoot, "public/seedImages/products/7800x3d.webp"),
      path.join(appRoot, "public/seedImages/products/7800x3d_2.webp"),
    ],
  },
  {
    name: "RX 6600",
    slug: "rx-6600",
    sku: "AMD-GPU-RX6600",
    description: "RX 6600 graphics card",
    brandName: "AMD",
    categoryName: "GPU",
    price: 280.99,
    images: [
      path.join(appRoot, "public/seedImages/products/rx6600.avif"),
      path.join(appRoot, "public/seedImages/products/rx6600_2.jpg"),
    ],
  },
  {
    name: "I5 12400",
    slug: "i5-12400",
    sku: "INTEL-CPU-I512400",
    description: "Intel Core i5 12400 processor",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 299.99,
    images: [
      path.join(appRoot, "public/seedImages/products/12400.jpg"),
      path.join(appRoot, "public/seedImages/products/12400_2.jpeg"),
    ],
  },
  {
    name: "I7 14600",
    slug: "i7-14600",
    sku: "INTEL-CPU-I714600",
    description: "Intel Core i7 14600 processor",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 449.99,
    images: [
      path.join(appRoot, "public/seedImages/products/14600.jpg"),
      path.join(appRoot, "public/seedImages/products/14600_2.webp"),
    ],
  },
  {
    name: "H410M H v2",
    slug: "h410m-h-v2",
    sku: "GIGABYTE-MB-H410MHV2",
    description: "H410M H v2 motherboard",
    brandName: "Gigabyte",
    categoryName: "Motherboard",
    price: 175.99,
    images: [
      path.join(appRoot, "public/seedImages/products/h410hv2.jpg"),
      path.join(appRoot, "public/seedImages/products/h410mhv2_2.webp"),
    ],
  },
  {
    name: "B550M K",
    slug: "b550m-k",
    sku: "GIGABYTE-MB-B550MK",
    description: "B550M K motherboard",
    brandName: "Gigabyte",
    categoryName: "Motherboard",
    price: 225.99,
    images: [
      path.join(appRoot, "public/seedImages/products/b550mk.png"),
      path.join(appRoot, "public/seedImages/products/b550mk_2.png"),
    ],
  },
  {
    name: "Ryzen 5 7600X",
    slug: "ryzen-5-7600x",
    sku: "AMD-CPU-7600X",
    description: "AMD Ryzen 5 7600X 6-core processor",
    brandName: "AMD",
    categoryName: "CPU",
    price: 299.99,
    images: [],
  },
  {
    name: "Intel Core i9 13900K",
    slug: "i9-13900k",
    sku: "INTEL-CPU-I913900K",
    description: "Intel Core i9 13900K flagship processor",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 589.99,
    images: [],
  },
  {
    name: "Ryzen 9 7900X",
    slug: "ryzen-9-7900x",
    sku: "AMD-CPU-7900X",
    description: "AMD Ryzen 9 7900X 12-core high-end processor",
    brandName: "AMD",
    categoryName: "CPU",
    price: 549.99,
    images: [],
  },
  {
    name: "Intel Core i3 12100F",
    slug: "i3-12100f",
    sku: "INTEL-CPU-I312100F",
    description: "Intel Core i3 12100F budget gaming processor",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 149.99,
    images: [],
  },
  {
    name: "Ryzen 7 5700X",
    slug: "ryzen-7-5700x",
    sku: "AMD-CPU-5700X",
    description: "AMD Ryzen 7 5700X AM4 socket processor",
    brandName: "AMD",
    categoryName: "CPU",
    price: 199.99,
    images: [],
  },
  {
    name: "Intel Core i5 13600K",
    slug: "i5-13600k",
    sku: "INTEL-CPU-I513600K",
    description: "Intel Core i5 13600K unlocked processor",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 329.99,
    images: [],
  },
  {
    name: "Ryzen 5 5600",
    slug: "ryzen-5-5600",
    sku: "AMD-CPU-5600",
    description: "AMD Ryzen 5 5600 6-core AM4 processor",
    brandName: "AMD",
    categoryName: "CPU",
    price: 159.99,
    images: [],
  },
  {
    name: "Intel Core i7 12700K",
    slug: "i7-12700k",
    sku: "INTEL-CPU-I712700K",
    description: "Intel Core i7 12700K 12-core processor",
    brandName: "INTEL",
    categoryName: "CPU",
    price: 419.99,
    images: [],
  },
  {
    name: "Ryzen 9 7950X",
    slug: "ryzen-9-7950x",
    sku: "AMD-CPU-7950X",
    description: "AMD Ryzen 9 7950X 16-core flagship processor",
    brandName: "AMD",
    categoryName: "CPU",
    price: 699.99,
    images: [],
  },

  // ===== GPUs (12 productos) =====
  {
    name: "GeForce RTX 4060",
    slug: "rtx-4060",
    sku: "NVIDIA-GPU-RTX4060",
    description: "NVIDIA GeForce RTX 4060 ray tracing graphics card",
    brandName: "NVIDIA",
    categoryName: "GPU",
    price: 299.99,
    images: [],
  },
  {
    name: "RX 7600 XT",
    slug: "rx-7600-xt",
    sku: "AMD-GPU-RX7600XT",
    description: "AMD Radeon RX 7600 XT RDNA3 graphics card",
    brandName: "AMD",
    categoryName: "GPU",
    price: 329.99,
    images: [],
  },
  {
    name: "GeForce RTX 4070",
    slug: "rtx-4070",
    sku: "NVIDIA-GPU-RTX4070",
    description: "NVIDIA GeForce RTX 4070 high performance GPU",
    brandName: "NVIDIA",
    categoryName: "GPU",
    price: 549.99,
    images: [],
  },
  {
    name: "RX 7700 XT",
    slug: "rx-7700-xt",
    sku: "AMD-GPU-RX7700XT",
    description: "AMD Radeon RX 7700 XT 1440p gaming GPU",
    brandName: "AMD",
    categoryName: "GPU",
    price: 449.99,
    images: [],
  },
  {
    name: "GeForce RTX 4080",
    slug: "rtx-4080",
    sku: "NVIDIA-GPU-RTX4080",
    description: "NVIDIA GeForce RTX 4080 enthusiast graphics card",
    brandName: "NVIDIA",
    categoryName: "GPU",
    price: 1199.99,
    images: [],
  },
  {
    name: "RX 7800 XT",
    slug: "rx-7800-xt",
    sku: "AMD-GPU-RX7800XT",
    description: "AMD Radeon RX 7800 XT high-end gaming GPU",
    brandName: "AMD",
    categoryName: "GPU",
    price: 499.99,
    images: [],
  },
  {
    name: "GeForce RTX 4090",
    slug: "rtx-4090",
    sku: "NVIDIA-GPU-RTX4090",
    description: "NVIDIA GeForce RTX 4090 flagship graphics card",
    brandName: "NVIDIA",
    categoryName: "GPU",
    price: 1599.99,
    images: [],
  },
  {
    name: "RX 6700 XT",
    slug: "rx-6700-xt",
    sku: "AMD-GPU-RX6700XT",
    description: "AMD Radeon RX 6700 XT RDNA2 graphics card",
    brandName: "AMD",
    categoryName: "GPU",
    price: 379.99,
    images: [],
  },
  {
    name: "GeForce RTX 4060 Ti",
    slug: "rtx-4060-ti",
    sku: "NVIDIA-GPU-RTX4060TI",
    description: "NVIDIA GeForce RTX 4060 Ti 16GB graphics card",
    brandName: "NVIDIA",
    categoryName: "GPU",
    price: 399.99,
    images: [],
  },
  {
    name: "RX 7900 XTX",
    slug: "rx-7900-xtx",
    sku: "AMD-GPU-RX7900XTX",
    description: "AMD Radeon RX 7900 XTX flagship RDNA3 GPU",
    brandName: "AMD",
    categoryName: "GPU",
    price: 999.99,
    images: [],
  },
  {
    name: "GeForce GTX 1660 Super",
    slug: "gtx-1660-super",
    sku: "NVIDIA-GPU-GTX1660S",
    description: "NVIDIA GeForce GTX 1660 Super budget gaming GPU",
    brandName: "NVIDIA",
    categoryName: "GPU",
    price: 229.99,
    images: [],
  },

  // ===== Motherboards (12 productos) =====
  {
    name: "ROG Strix B650E-E",
    slug: "rog-strix-b650e-e",
    sku: "ASUS-MB-B650EE",
    description: "ASUS ROG Strix B650E-E gaming motherboard",
    brandName: "ASUS",
    categoryName: "Motherboard",
    price: 329.99,
    images: [],
  },
  {
    name: "MSI B450 Tomahawk Max",
    slug: "b450-tomahawk-max",
    sku: "MSI-MB-B450TMAX",
    description: "MSI B450 Tomahawk Max AMD motherboard",
    brandName: "MSI",
    categoryName: "Motherboard",
    price: 109.99,
    images: [],
  },
  {
    name: "Z790 AORUS Elite",
    slug: "z790-aorus-elite",
    sku: "GIGABYTE-MB-Z790ELITE",
    description: "Gigabyte Z790 AORUS Elite Intel LGA1700 motherboard",
    brandName: "Gigabyte",
    categoryName: "Motherboard",
    price: 259.99,
    images: [],
  },
  {
    name: "PRIME X670-P",
    slug: "prime-x670-p",
    sku: "ASUS-MB-X670P",
    description: "ASUS PRIME X670-P AMD AM5 motherboard",
    brandName: "ASUS",
    categoryName: "Motherboard",
    price: 199.99,
    images: [],
  },
  {
    name: "MSI Z690 Gaming Plus",
    slug: "z690-gaming-plus",
    sku: "MSI-MB-Z690GP",
    description: "MSI Z690 Gaming Plus Intel motherboard",
    brandName: "MSI",
    categoryName: "Motherboard",
    price: 189.99,
    images: [],
  },
  {
    name: "B450M DS3H",
    slug: "b450m-ds3h",
    sku: "GIGABYTE-MB-B450DS3H",
    description: "Gigabyte B450M DS3H micro-ATX AMD motherboard",
    brandName: "Gigabyte",
    categoryName: "Motherboard",
    price: 89.99,
    images: [],
  },
  {
    name: "ROG Crosshair X670E Hero",
    slug: "rog-crosshair-x670e-hero",
    sku: "ASUS-MB-X670HERO",
    description: "ASUS ROG Crosshair X670E Hero premium motherboard",
    brandName: "ASUS",
    categoryName: "Motherboard",
    price: 629.99,
    images: [],
  },
  {
    name: "MSI X570S Tomahawk Max",
    slug: "x570s-tomahawk-max",
    sku: "MSI-MB-X570STMAX",
    description: "MSI X570S Tomahawk Max WiFi motherboard",
    brandName: "MSI",
    categoryName: "Motherboard",
    price: 249.99,
    images: [],
  },
  {
    name: "H610M H DDR4",
    slug: "h610m-h-ddr4",
    sku: "GIGABYTE-MB-H610HDDR4",
    description: "Gigabyte H610M H DDR4 budget Intel motherboard",
    brandName: "Gigabyte",
    categoryName: "Motherboard",
    price: 79.99,
    images: [],
  },
  {
    name: "TUF Gaming B550M-Plus",
    slug: "tuf-gaming-b550m-plus",
    sku: "ASUS-MB-B550MPLUS",
    description: "ASUS TUF Gaming B550M-Plus micro-ATX motherboard",
    brandName: "ASUS",
    categoryName: "Motherboard",
    price: 149.99,
    images: [],
  },

  // ===== Cases (12 productos) =====
  {
    name: "NZXT H5 Flow",
    slug: "nzxt-h5-flow",
    sku: "NZXT-CASE-H5FLOW",
    description: "NZXT H5 Flow mid-tower gaming case",
    brandName: "NZXT",
    categoryName: "Case",
    price: 89.99,
    images: [],
  },
  {
    name: "Corsair 4000D Airflow",
    slug: "corsair-4000d-airflow",
    sku: "CORSAIR-CASE-4000D",
    description: "Corsair 4000D Airflow mid-tower case",
    brandName: "Corsair",
    categoryName: "Case",
    price: 94.99,
    images: [],
  },
  {
    name: "Lian Li O11 Dynamic",
    slug: "lian-li-o11-dynamic",
    sku: "LIANLI-CASE-O11DYN",
    description: "Lian Li O11 Dynamic premium glass case",
    brandName: "Lian Li",
    categoryName: "Case",
    price: 139.99,
    images: [],
  },
  {
    name: "Fractal Design Core 1000",
    slug: "fractal-design-core-1000",
    sku: "FRACTAL-CASE-CORE1000",
    description: "Fractal Design Core 1000 micro-ATX case",
    brandName: "Fractal Design",
    categoryName: "Case",
    price: 49.99,
    images: [],
  },
  {
    name: "Corsair 5000D",
    slug: "corsair-5000d",
    sku: "CORSAIR-CASE-5000D",
    description: "Corsair 5000D full-tower enthusiast case",
    brandName: "Corsair",
    categoryName: "Case",
    price: 149.99,
    images: [],
  },
  {
    name: "Cooler Master MasterBox Q300L",
    slug: "cooler-master-masterbox-q300l",
    sku: "CM-CASE-Q300L",
    description: "Cooler Master MasterBox Q300L compact case",
    brandName: "Cooler Master",
    categoryName: "Case",
    price: 44.99,
    images: [],
  },
  {
    name: "be quiet! Pure Base 500DX",
    slug: "be-quiet-pure-base-500dx",
    sku: "BEQUIET-CASE-PB500DX",
    description: "be quiet! Pure Base 500DX silent mid-tower case",
    brandName: "be quiet!",
    categoryName: "Case",
    price: 99.99,
    images: [],
  },
  {
    name: "NZXT H7 Flow",
    slug: "nzxt-h7-flow",
    sku: "NZXT-CASE-H7FLOW",
    description: "NZXT H7 Flow premium mid-tower case",
    brandName: "NZXT",
    categoryName: "Case",
    price: 129.99,
    images: [],
  },
  {
    name: "Phanteks Eclipse P300A",
    slug: "phanteks-eclipse-p300a",
    sku: "PHANTEKS-CASE-P300A",
    description: "Phanteks Eclipse P300A mesh front case",
    brandName: "Phanteks",
    categoryName: "Case",
    price: 59.99,
    images: [],
  },
  {
    name: "Lian Li PC-O11 Air Mini",
    slug: "lian-li-o11-air-mini",
    sku: "LIANLI-CASE-O11MINI",
    description: "Lian Li PC-O11 Air Mini compact case",
    brandName: "Lian Li",
    categoryName: "Case",
    price: 109.99,
    images: [],
  },
  {
    name: "Corsair iCUE 4000X RGB",
    slug: "corsair-icue-4000x-rgb",
    sku: "CORSAIR-CASE-4000XRGB",
    description: "Corsair iCUE 4000X RGB tempered glass case",
    brandName: "Corsair",
    categoryName: "Case",
    price: 124.99,
    images: [],
  },
  {
    name: "Thermaltake Core V21",
    slug: "thermaltake-core-v21",
    sku: "TT-CASE-COREV21",
    description: "Thermaltake Core V21 cube micro-ATX case",
    brandName: "Thermaltake",
    categoryName: "Case",
    price: 64.99,
    images: [],
  },

  // ===== Power Supplies (12 productos) =====
  {
    name: "Corsair RM750x",
    slug: "corsair-rm750x",
    sku: "CORSAIR-PSU-RM750X",
    description: "Corsair RM750x 750W 80+ Gold modular PSU",
    brandName: "Corsair",
    categoryName: "Power Supply",
    price: 119.99,
    images: [],
  },
  {
    name: "EVGA SuperNOVA 650 G6",
    slug: "evga-supernova-650-g6",
    sku: "EVGA-PSU-650G6",
    description: "EVGA SuperNOVA 650 G6 650W 80+ Gold PSU",
    brandName: "EVGA",
    categoryName: "Power Supply",
    price: 89.99,
    images: [],
  },
  {
    name: "Seasonic Focus GX-850",
    slug: "seasonic-focus-gx-850",
    sku: "SEASONIC-PSU-GX850",
    description: "Seasonic Focus GX-850 850W 80+ Gold PSU",
    brandName: "Seasonic",
    categoryName: "Power Supply",
    price: 149.99,
    images: [],
  },
  {
    name: "be quiet! Straight Power 11",
    slug: "be-quiet-straight-power-11",
    sku: "BEQUIET-PSU-SP11-650",
    description: "be quiet! Straight Power 11 650W 80+ Gold PSU",
    brandName: "be quiet!",
    categoryName: "Power Supply",
    price: 109.99,
    images: [],
  },
  {
    name: "Corsair CV550",
    slug: "corsair-cv550",
    sku: "CORSAIR-PSU-CV550",
    description: "Corsair CV550 550W 80+ Bronze budget PSU",
    brandName: "Corsair",
    categoryName: "Power Supply",
    price: 59.99,
    images: [],
  },
  {
    name: "Cooler Master MWE Gold 750",
    slug: "cooler-master-mwe-gold-750",
    sku: "CM-PSU-MWE750",
    description: "Cooler Master MWE Gold 750W modular PSU",
    brandName: "Cooler Master",
    categoryName: "Power Supply",
    price: 99.99,
    images: [],
  },
  {
    name: "EVGA SuperNOVA 1000 P6",
    slug: "evga-supernova-1000-p6",
    sku: "EVGA-PSU-1000P6",
    description: "EVGA SuperNOVA 1000 P6 1000W 80+ Platinum PSU",
    brandName: "EVGA",
    categoryName: "Power Supply",
    price: 179.99,
    images: [],
  },
  {
    name: "Seasonic Prime TX-1000",
    slug: "seasonic-prime-tx-1000",
    sku: "SEASONIC-PSU-TX1000",
    description: "Seasonic Prime TX-1000 1000W 80+ Titanium PSU",
    brandName: "Seasonic",
    categoryName: "Power Supply",
    price: 299.99,
    images: [],
  },
  {
    name: "Thermaltake Toughpower GF1",
    slug: "thermaltake-toughpower-gf1",
    sku: "TT-PSU-GF1-650",
    description: "Thermaltake Toughpower GF1 650W 80+ Gold PSU",
    brandName: "Thermaltake",
    categoryName: "Power Supply",
    price: 79.99,
    images: [],
  },
  {
    name: "MSI MPG A750GF",
    slug: "msi-mpg-a750gf",
    sku: "MSI-PSU-A750GF",
    description: "MSI MPG A750GF 750W 80+ Gold modular PSU",
    brandName: "MSI",
    categoryName: "Power Supply",
    price: 109.99,
    images: [],
  },
  {
    name: "Corsair HX1200",
    slug: "corsair-hx1200",
    sku: "CORSAIR-PSU-HX1200",
    description: "Corsair HX1200 1200W 80+ Platinum high-end PSU",
    brandName: "Corsair",
    categoryName: "Power Supply",
    price: 249.99,
    images: [],
  },
  {
    name: "EVGA BR 500W",
    slug: "evga-br-500w",
    sku: "EVGA-PSU-BR500",
    description: "EVGA BR 500W 80+ Bronze entry-level PSU",
    brandName: "EVGA",
    categoryName: "Power Supply",
    price: 49.99,
    images: [],
  },

  // ===== RAM (12 productos) =====
  {
    name: "Corsair Vengeance LPX 16GB",
    slug: "corsair-vengeance-lpx-16gb",
    sku: "CORSAIR-RAM-VLP16GB",
    description: "Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200",
    brandName: "Corsair",
    categoryName: "Ram",
    price: 54.99,
    images: [],
  },
  {
    name: "Kingston Fury Beast 32GB",
    slug: "kingston-fury-beast-32gb",
    sku: "KINGSTON-RAM-FB32GB",
    description: "Kingston Fury Beast 32GB (2x16GB) DDR4-3600",
    brandName: "Kingston",
    categoryName: "Ram",
    price: 89.99,
    images: [],
  },
  {
    name: "G.Skill Ripjaws V 16GB",
    slug: "gskill-ripjaws-v-16gb",
    sku: "GSKILL-RAM-RV16GB",
    description: "G.Skill Ripjaws V 16GB (2x8GB) DDR4-3600",
    brandName: "G.Skill",
    categoryName: "Ram",
    price: 59.99,
    images: [],
  },
  {
    name: "Corsair Dominator Platinum RGB",
    slug: "corsair-dominator-platinum-rgb",
    sku: "CORSAIR-RAM-DPLAT32",
    description: "Corsair Dominator Platinum RGB 32GB DDR5-5600",
    brandName: "Corsair",
    categoryName: "Ram",
    price: 299.99,
    images: [],
  },
  {
    name: "Kingston Fury Renegade 16GB",
    slug: "kingston-fury-renegade-16gb",
    sku: "KINGSTON-RAM-FR16GB",
    description: "Kingston Fury Renegade 16GB (2x8GB) DDR5-6000",
    brandName: "Kingston",
    categoryName: "Ram",
    price: 139.99,
    images: [],
  },
  {
    name: "Crucial Ballistix 32GB",
    slug: "crucial-ballistix-32gb",
    sku: "CRUCIAL-RAM-BAL32GB",
    description: "Crucial Ballistix 32GB (2x16GB) DDR4-3200",
    brandName: "Crucial",
    categoryName: "Ram",
    price: 79.99,
    images: [],
  },
  {
    name: "G.Skill Trident Z5 RGB",
    slug: "gskill-trident-z5-rgb",
    sku: "GSKILL-RAM-TZ5RGB32",
    description: "G.Skill Trident Z5 RGB 32GB DDR5-6400",
    brandName: "G.Skill",
    categoryName: "Ram",
    price: 249.99,
    images: [],
  },
  {
    name: "Team T-Create Expert 64GB",
    slug: "team-t-create-expert-64gb",
    sku: "TEAM-RAM-TCE64GB",
    description: "Team T-Create Expert 64GB (2x32GB) DDR4-3200",
    brandName: "Team Group",
    categoryName: "Ram",
    price: 189.99,
    images: [],
  },
  {
    name: "Corsair Vengeance RGB Pro",
    slug: "corsair-vengeance-rgb-pro",
    sku: "CORSAIR-RAM-VRGB32",
    description: "Corsair Vengeance RGB Pro 32GB DDR4-3600",
    brandName: "Corsair",
    categoryName: "Ram",
    price: 119.99,
    images: [],
  },
  {
    name: "Kingston Fury Impact 16GB",
    slug: "kingston-fury-impact-16gb",
    sku: "KINGSTON-RAM-FI16GB",
    description: "Kingston Fury Impact 16GB (2x8GB) DDR5-4800 SO-DIMM",
    brandName: "Kingston",
    categoryName: "Ram",
    price: 109.99,
    images: [],
  },
  {
    name: "Patriot Viper Steel 8GB",
    slug: "patriot-viper-steel-8gb",
    sku: "PATRIOT-RAM-VS8GB",
    description: "Patriot Viper Steel 8GB (2x4GB) DDR4-3200",
    brandName: "Patriot",
    categoryName: "Ram",
    price: 34.99,
    images: [],
  },
  {
    name: "ADATA XPG Spectrix D60G",
    slug: "adata-xpg-spectrix-d60g",
    sku: "ADATA-RAM-D60G32GB",
    description: "ADATA XPG Spectrix D60G 32GB DDR4-3600 RGB",
    brandName: "ADATA",
    categoryName: "Ram",
    price: 109.99,
    images: [],
  },
];

/* const userData: Prisma.UserCreateInput[] = [
  {
    name: "admin",
    email: "Admin@example.com",
    auth0_id: "",
  },
]; */

export async function main() {
  /* for (const u of userData) {
    await prisma.user.create({ data: u });
  } */
  console.log("cleaning DB");
  await prisma.product.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.category.deleteMany({});

  const brandPromises = initBrands.map(async (brand) => {
    const imageUrl = await uploadImage(brand.logo);
    return prisma.brand.create({
      data: {
        name: brand.name,
        logo: imageUrl,
      },
    });
  });
  const createdBrands = await Promise.all(brandPromises);
  console.log(`added ${createdBrands.length} brands.`);

  const categoryPromises = initCategories.map(async (category) => {
    const imageUrl = await uploadImage(category.imageUrl!);
    return prisma.category.create({
      data: {
        name: category.name!,
        slug: category.slug!,
        imageUrl: imageUrl,
      },
    });
  });
  const createdCategories = await Promise.all(categoryPromises);
  console.log(`added ${createdCategories.length} categories.`);

  for (const product of initProducts) {
    const brand = createdBrands.find((b) => b.name === product.brandName);
    const category = createdCategories.find(
      (c) => c.name === product.categoryName
    );

    if (!brand || !category) {
      console.warn(
        `Saltando el producto ${product.name}, no se encontró la marca o categoría.`
      );
      continue;
    }

    const uploadedImageUrls = await Promise.all(
      product.images!.map((path) => (path !== "" ? uploadImage(path) : ""))
    );

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price!,
        sku: product.sku!,
        slug: product.slug!,
        brandId: brand.id,
        categoryId: category.id,
        images: uploadedImageUrls,
      },
    });
    console.log(`Product "${product.name}" create.`);
  }
}

main();
