import { FlippingCard } from "@/registry/new-york-v4/ui/flipping-card"

interface CardData {
  id: string
  front: {
    imageSrc: string
    imageAlt: string
    title: string
    description: string
  }
  back: {
    description: string
    buttonText: string
  }
}

const cardsData: CardData[] = [
  {
    id: "badtz-maru",
    front: {
      imageSrc:
        "https://cdn.badtz-ui.com/images/components/flipping-card/badtz.webp",
      imageAlt: "Badtz-Maru",
      title: "Badtz-Maru",
      description:
        'Bad Badtz-Maru (バッドばつ丸, Baddo Batsu Maru), commonly named "Badtz-Maru" is a penguin with spiky hair.',
    },
    back: {
      description:
        'Bad Badtz-Maru (バッドばつ丸, Baddo Batsu Maru), commonly named "Badtz-Maru", is a penguin with spiky hair, and one of the many characters of Sanrio.',
      buttonText: "Learn More",
    },
  },
  {
    id: "keroppi",
    front: {
      imageSrc:
        "https://cdn.badtz-ui.com/images/components/flipping-card/keroppii.webp",
      imageAlt: "Keroppi",
      title: "Keroppi",
      description:
        "Keroppi (けろけろけろっぴ, Kerokerokeroppi) is a small friendly green frog with large eyes.",
    },
    back: {
      description:
        "Keroppi (けろけろけろっぴ, Kerokerokeroppi) is a character created by Sanrio, designed by Tomoe Iwata, and the main protagonist of the Keroppi universe.",
      buttonText: "Learn More",
    },
  },
]

export default function FlippingCardDemo() {
  return (
    <div className="flex gap-4">
      {cardsData.map((card) => (
        <FlippingCard
          key={card.id}
          width={300}
          frontContent={<GenericCardFront data={card.front} />}
          backContent={<GenericCardBack data={card.back} />}
        />
      ))}
    </div>
  )
}

interface GenericCardFrontProps {
  data: CardData["front"]
}

function GenericCardFront({ data }: GenericCardFrontProps) {
  return (
    <div className="flex h-full w-full flex-col p-4">
      <img
        src={data.imageSrc}
        alt={data.imageAlt}
        className="h-auto min-h-0 w-full flex-grow rounded-md object-cover"
      />
      <div className="p-2">
        <h3 className="mt-2 text-base font-semibold">{data.title}</h3>
        <p className="text-muted-foreground mt-2 text-[13.5px]">
          {data.description}
        </p>
      </div>
    </div>
  )
}

interface GenericCardBackProps {
  data: CardData["back"]
}

function GenericCardBack({ data }: GenericCardBackProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6">
      <p className="text-muted-foreground mt-2 text-center text-[13.5px]">
        {data.description}
      </p>
      <button className="bg-foreground text-background mt-6 flex h-8 w-min items-center justify-center rounded-md px-4 py-2 text-[13.5px] whitespace-nowrap">
        {data.buttonText}
      </button>
    </div>
  )
}
