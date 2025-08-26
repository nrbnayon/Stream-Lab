"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { minutesToHours, truncateText, webShare } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, Time04Icon } from "@hugeicons/core-free-icons/index";
import { Button } from "./ui/button";
import TrailerPopup from "./trailer-popup";
import PaymentDialog from "./dashboard/payment-dialog";
import Link from "next/link";
import WebShare from "./web-share";
import PaymentTriggerBtn from "./dashboard/payment-trigger-btn";

export default function MovieCard({ movie, useLink = false }) {
  const {
    id,
    title,
    thumbnail_url,
    duration,
    logline,
    buy_price,
    rent_price,
    type,
  } = movie;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="relative">
          {useLink ? (
            <Link href={`/film/${id}`}>
              <Image
                src={thumbnail_url}
                alt={title}
                width={200}
                height={80}
                className="w-full rounded-md h-44 object-cover"
              />
            </Link>
          ) : (
            <Image
              src={thumbnail_url}
              alt={title}
              width={200}
              height={80}
              className="w-full rounded-md h-44 object-cover"
            />
          )}
          {/* Trailer button and popup */}
          <TrailerPopup
            movie={movie}
            absolute={true}
            triggerBtn={
              <Button
                variant="destructive"
                size="sm"
                className="rounded-full"
                asChild
              >
                <span>
                  <HugeiconsIcon icon={PlayIcon} />
                  Trailer
                </span>
              </Button>
            }
          />
        </div>
        <CardTitle className="text-xl">
          {useLink ? <Link href={`/film/${id}`}>{title}</Link> : title}
        </CardTitle>

        {/* Badge and Duration */}
        <div className="flex gap-5">
          <Badge variant="secondary">{type}</Badge>
          <span className="text-secondary-foreground text-sm flex gap-2 items-center">
            <HugeiconsIcon icon={Time04Icon} size={18} />
            {minutesToHours(duration)}
          </span>
        </div>

        {/* movie description */}
        <CardDescription className="text-base">
          {truncateText(logline)}
        </CardDescription>
      </CardHeader>

      {/* Content | prices */}
      <CardContent className="text-muted-foreground">
        <p className="flex justify-between">
          <span>Rent</span>
          <span>${rent_price}</span>
        </p>
        <p className="flex justify-between">
          <span>Buy</span>
          <span>${buy_price}</span>
        </p>
      </CardContent>

      {/* Footer | button & share */}
      <CardFooter className="flex gap-2">
        <div className="grid grid-cols-2 w-full gap-2">
          <PaymentDialog
            dialogTitle={`Rent  –  ${title}`}
            inputValue={``}
            triggerBtn={
              <PaymentTriggerBtn className="w-full" asChild>
                <span>Rent</span>
              </PaymentTriggerBtn>
            }
            intention="rent"
            intentionBtnText="Pay"
          />
          <PaymentDialog
            dialogTitle={`Buy – ${title}`}
            inputValue={``}
            triggerBtn={
              <PaymentTriggerBtn className="w-full" variant="outline" asChild>
                <span>Buy</span>
              </PaymentTriggerBtn>
            }
            intention="buy"
            intentionBtnText="Pay"
          />
        </div>

        <WebShare title={title} url={`affiliated link`} />
      </CardFooter>
    </Card>
  );
}
