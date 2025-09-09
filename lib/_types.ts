export type Translate = {
  t: Record<string, string>
}

export type Params = Promise<{ lang: "mn" | "en" | "zh" }>

export type PageProps = {
  params: Params
}
