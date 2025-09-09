import { Card } from "@/components/ui/card"

export function InfoCard({
  title,
  icon,
  body,
}: {
  title: string
  icon?: React.ReactNode
  body?: string
}) {
  return (
    <Card className="border-none items-center text-center p-6 shadow-lgv text-primary">
      <article>{icon}</article>
      <h3 className="text-2xl uppercase font-bold">{title}</h3>
      <p className="text-black text-base">{body}</p>
    </Card>
  )
}
