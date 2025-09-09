import { PageProps } from "@/lib/_types"
import { InfoCard } from "./components/info-card"
import { EyeIcon, GiftIcon, Lightbulb } from "lucide-react"
import Image from "next/image"
import { getT } from "@/lib/i18n"

export default async function AboutPage({ params }: PageProps) {
  const { lang: language } = await params
  const t = getT(language)

  return (
    <div className="container mx-auto px-4 py-20 space-y-12 flex justify-center flex-col">
      <InfoCard
        title={t.vision}
        icon={<EyeIcon className="size-14" />}
        body={t.visionBody}
      />
      <Lightbulb className="size-14 mx-auto text-nalaikh-gold" />
      <div className="text-center space-y-4 bg-primary text-white p-8 rounded-lg shadow-lgv">
        <h3 className="text-2xl font-bold">{t.participation}</h3>
      </div>
      <InfoCard
        title={t.mission}
        icon={<GiftIcon className="size-14" />}
        body={t.missionBody}
      />
      <section className="py-20 bg-white flex flex-col justify-center dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4 dark:text-white">
          {t.directorGreeting}
        </h2>
        <div className="grid grid-cols-3 gap-8 mt-12">
          <article className="col-span-1 mr-8">
            <Image
              src="/images/about/director-message.jpg"
              alt="Захирлын мэндчилгээ"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </article>
          <p className="col-span-2 text-justify text-base leading-7 dark:text-white">
            Эрхэм хүндэт Налайх дүүргийн иргэд, харилцагч та бүхэндээ энэ өдрийн
            мэндийг хүргэе. Налайх дүүрэг нь нийслэлийн зүүн хязгаар, уулын
            бүсэд оршдог бөгөөд түүхэн хөгжлийн хувьд уул уурхай, аж
            үйлдвэржилтийн төв болж ирсэн. Гэвч сүүлийн жилүүдэд эдийн засгийн
            бүтэц, нийгмийн орчин өөрчлөгдөж, иргэдийн амьдралын чанар, орчныг
            сайжруулах шаардлага улам бүр нэмэгдэж байна. Тиймээс бид "Ногоон
            Налайх" төслийг хэрэгжүүлэхээр зорьж байна. Энэхүү төсөл нь Налайх
            дүүргийн гэр хорооллыг дахин төлөвлөн, дэд бүтцийг иж бүрнээр
            шийдсэн, иргэдийн эрүүл, аюулгүй, орчныг бүрдүүлсэн амьдрахад таатай
            орчин бүрдүүлэхэд чиглэсэн юм. Төслийн хүрээнд иргэдийн оролцоог
            дэмжиж, тэдний санал бодлыг тусган, хамтын ажиллагааг бэхжүүлэхийг
            зорьж байна. Ингэснээр иргэд өөрсдийн орчиндоо эзэн болох, оршин
            суугчдын амьдралын чанар сайжрах, нийгмийн харилцаа сайжрах зэрэг
            олон эерэг үр дүн гарах болно. "Ногоон Налайх" төсөл нь зөвхөн дэд
            бүтцийн сайжруулалт төдийгүй, иргэдийн амьдралын чанарыг дээшлүүлэх,
            орчныг сайжруулах, нийгмийн оролцоог нэмэгдүүлэх зэрэг олон талын ач
            холбогдолтой. Тиймээс бид энэ төслийг амжилттай хэрэгжүүлэхийн тулд
            иргэд, төрийн байгууллага, хувийн хэвшил, иргэний нийгмийн
            байгууллагууд зэрэг олон талын оролцоог дэмжихийг уриалж байна.
            Иргэд та бүхэн өөрсдийн санал бодлоо чөлөөтэй илэрхийлж, оролцох
            боломжтой бөгөөд бид та бүхний санал хүсэлтийг хүндэтгэн авч үзэх
            болно.
          </p>
        </div>
      </section>
    </div>
  )
}
