export type SizeType = "small" | "middle" | "large" | undefined;

export interface AvatarProps {
  size?: SizeType;
  shadow?: boolean;
  url?: string;
}
