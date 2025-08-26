import { aiGenerationCards } from "@/constants";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GenerationCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      {aiGenerationCards.map((card, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              {card.icon}
              {card.title}
            </CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={card.href}>
              <Button variant="secondary" size="responsive">
                {card.btnText}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
