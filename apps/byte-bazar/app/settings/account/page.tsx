import ProfileSettings from "../../../components/profile/profile-settings";
import { getUserId } from "../../../lib/auth";
import { getClientById } from "../../../src/actions/user.actions";

const Page = async () => {
  const userId = await getUserId();
  const user = await getClientById(userId);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="mb-10">
      <ProfileSettings data={user} />
    </div>
  );
};

export default Page;
