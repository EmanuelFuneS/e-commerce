import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

interface ProfilePictureProps {
  size?: number;
  src?: string;
}
const ProfilePicture = ({ size, src }: ProfilePictureProps) => {
  return (
    <Avatar className={size ? `w-${size} h-${size}` : "w-10 h-10"}>
      <AvatarImage src={src || "https://github.com/shadcn.png"} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default ProfilePicture;
