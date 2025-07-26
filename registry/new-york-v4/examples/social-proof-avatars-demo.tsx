import { SocialProofAvatars } from "@/registry/new-york-v4/ui/social-proof-avatars"

const avatars = [
  {
    alt: "Avatar 1",
    src: "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-1.webp",
  },
  {
    alt: "Avatar 2",
    src: "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-2.webp",
  },
  {
    alt: "Avatar 3",
    src: "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-3.webp",
  },
  {
    alt: "Avatar 4",
    src: "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-4.webp",
  },
  {
    alt: "Avatar 5",
    src: "https://cdn.badtz-ui.com/images/components/avatar-proof/avatar-5.webp",
  },
]

export default function SocialProofAvatarsDemo() {
  return (
    <SocialProofAvatars avatars={avatars} extraCount={70}>
      <p className="whitespace-nowrap">
        +70 <strong className="font-semibold">satisfied</strong> clients
      </p>
    </SocialProofAvatars>
  )
}
