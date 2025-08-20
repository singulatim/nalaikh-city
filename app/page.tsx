import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  TreePine,
  Home,
  Factory,
  Moon,
  Sun,
  Waves,
  GraduationCap,
  Leaf,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import NcdcLogo from "@/assets/logos/ncdc-logo.jpg"
import CityImage from "@/assets/images/nalaikh-city.jpg"

type Language = "mn" | "en" | "zh"
type Theme = "light" | "dark"

const translations = {
  mn: {
    company: "Налайх хотын хөгжлийн корпораци",
    greenNalaikh: "Ногоон Налайх",
    projects: "Төслүүд",
    financing: "Санхүүжилт",
    contact: "Холбоо барих",
    getQuote: "Санал авах",
    ecoFriendlyCity: "Байгальд ээлтэй хот",
    heroTitle: "НОГООН НАЛАЙХ",
    heroDescription:
      'Байгальд ээлтэй хот байгуулалт. Налайх хотын хөгжлийн корпораци ОНӨААТҮГ-ийн "Ногоон Налайх" төсөл нь тогтвортой хөгжил, экосистемийн хамгаалалт, ногоон технологийг нэгтгэсэн шинэлэг шийдэл юм.',
    viewProjects: "Төслүүдийг үзэх",
    learnMore: "Дэлгэрэнгүй",

    // Green Nalaikh Components
    greenComponents: '"Ногоон Налайх" төслийн бүрэлдэхүүн',
    greenComponentsDesc: "Байгальд ээлтэй хот байгуулалтын цогц шийдэл",
    greenZone: "Ногоон бүс",
    greenZoneDesc: "Нийтийн эзэмшлийн мод, бут сөөг, зүлэг, цэцэг, хүлэмж",
    waterPoints: "Усны цэгүүд",
    waterPointsDesc: "Хөв цөөрөм, усан сан, усан парк гэх мэт уст цэгүүд",
    ecoEducation: "Эко боловсрол",
    ecoEducationDesc:
      '"Ногоон Налайх" эко боловсрол олгох тогтолцоо, дагалдах дэд бүтэц',
    greenTech: "Ногоон технологи",
    greenTechDesc:
      "Ногоон технологи шингээсэн байгууламж, барилга, орон сууц, зам, талбай",

    // Project Outcomes
    strategicResults: "Стратегийн үр дүн",
    projectOutcomes: "Төслүүд уялдаатай ажилласнаар гарах томоохон үр дүн",
    projectOutcomesDesc:
      "Нэгдмэл хандлагаар хэрэгжүүлэх төслүүд нь Налайх хотыг орчин үеийн, тогтвортой хөгжилтэй хот болгон өөрчлөх болно.",
    industrialPark: "Үйлдвэрлэл технологийн парк",
    industrialParkDesc: "Орчин үеийн технологи, инновацийн төв",
    urbanDevelopment: "Хот байгуулалт, орон сууцжуулалт",
    urbanDevelopmentDesc: "Орчин үеийн орон сууц, дэд бүтэц",
    economicZone: "Эдийн засгийн тусгай бүс",
    economicZoneDesc: "Хөрөнгө оруулалт, бизнесийн орчин",
    greenNalaikhProject: "Ногоон Налайх",
    greenNalaikhDesc: "Байгальд ээлтэй, тогтвортой хөгжил",

    // Benefits
    benefitsTitle: "Эдгээр төслүүдээс гарах ашиг тус",
    benefitsDesc: "Налайх хотын эдийн засаг, нийгмийн хөгжилд үзүүлэх нөлөө",
    greenFinancing: "Ногоон санхүүжилт татах",
    greenFinancingDesc: "Олон улсын ногоон сангаас хөрөнгө татах боломж",
    exportSupport: "Экспортын дэмжлэг сайжрана",
    exportSupportDesc: "Үйлдвэрлэсэн бүтээгдэхүүний экспорт нэмэгдэнэ",
    jobCreation: "Ажиллах хүчний эрэлт нэмэгдэнэ",
    jobCreationDesc: "Шинэ ажлын байр, мэргэжлийн хөгжил",
    newTechnology: "Шинэ технологи нэвтрүүлнэ",
    newTechnologyDesc: "Инновац, дижитал шилжилт",

    // Statistics
    projectCoordination: "Төслийн уялдаа",
    projectCoordinationDesc: "Хоорондын уялдаа хангагдана",
    livingEnvironment: "Амьдрах таатай орчин",
    livingEnvironmentDesc: "Хотын үзэмж сайжирна",
    developmentModel: "Хөгжлийн загвар",
    developmentModelDesc: "Жишиг загварыг бий болгоно",

    // Housing Statistics
    housingStats: "Орон сууцны статистик",
    housingShortage: "Орон сууцны бэрхшээл",
    downPaymentCapable: "Урьдчилгаа төлбөр боломжтой",
    downPaymentCapableDesc:
      "НДШ, Цалин Орлого, Урьдчилгаа төлбөр, Барьцаа хөрөнгөтэй",
    noDownPayment: "Урьдчилгаа төлбөрийн хуримтлалгүй",
    noDownPaymentDesc:
      "НДШ, Цалин орлогоор баталгаажсан ч урьдчилгаа төлбөрийн бэрхшээлтэй",
    mortgageDemand: "өрх - Ипотек зээлийн эрэлт",
    totalBorrowers: "Нийт зээлдэгч:",
    normalLoans: "Хэвийн зээл:",
    badLoans: "Муу зээл:",
    totalRisk: "Нийт эрсдэлийн хэмжээ",

    // Financing Solutions
    financingSolutions: "Санхүүжилтийн шийдэл",
    financingSolutionsDesc:
      "Нийлмэл хүүгүй, өртгийн хэмнэлттэй корпорацийн санхүүжилт",
    constructionFinancing: "Барилгажилтын санхүүжилт & Корпорацийн санхүүжилт",
    currentProblem: "Одоогийн асуудал:",
    currentProblemDesc:
      "Барилгын төсөл хэрэгжүүлэгч аж ахуйн нэгж нь барилгажилтын хугацаанд шаардлагатай санхүүжилтийг банк санхүүгийн байгууллагаас арилжааны зээл авах замаар шийдвэрлэдэг. Арилжааны зээл нь жилийн 23%-ийн хүүтэй байдаг.",
    solution: "Шийдэл:",
    solutionDesc:
      "Бид барилга баригдаж эхлэх үеэс иргэнийг ипотекийн зээлд хамруулвал энэ хүү асуудал шийдэгдэнэ.",
    priceComparison: "Үнийн харьцуулалт",
    bankLoanPrice: "Банкны зээлийн дараах үнэ:",
    preOrderPrice: "Урьдчилсан захиалгын үнэ:",
    actualSavings: "Бодит хэмнэлт: ₮76,000,000",

    // Four Solutions
    downPaymentInsurance: "Урьдчилгаа төлбөрийн даатгал",
    downPaymentInsuranceDesc:
      "Залууст ээлтэй орон сууцны хөтөлбөр Даатгал ба баталгаат схем",
    corporateFinancing: "Корпорацийн санхүүжилт",
    corporateFinancingDesc: "Нийлмэл хүүгүй, өртгийн хэмнэлттэй",
    fundingSources: "Санхүүжилтийн эх үүсвэр",
    fundingSourcesDesc: "Хүрэлцээтэй, бие даасан",
    passiveHousing: "Пассив стандарт орон сууц",
    passiveHousingDesc:
      "Ногоон санхүүжилт GCF, ADB, JICA. EU Passive House стандарт",

    // Implementation Timeline
    implementationTimeline: "Хэрэгжүүлэх дараалал",
    step1: "Төсөл боловсруулах",
    step2: "Санхүүжүүлэгч байгууллагад хандах",
    step3: "Төслийн зөвлөх үйлчилгээ",
    step4: "Төслийн санхүүжилт авах",
    step5: "Төслийг хэрэгжүүлэх",

    // Contact & Footer
    contactUs: "Холбоо барих",
    contactDesc: "Налайх хотын хөгжлийн корпораци ОНӨААТҮГ",
    phone: "Утас",
    email: "И-мэйл",
    address:
      "Улаанбаатар хот, Баянзүрх дүүрэг, 26 дугаар хороо, Хүннүгийн гудамж, MAY SEVEN, 202 тоот",
    addressText: "Налайх дүүрэг\nУлаанбаатар хот, Монгол улс",
    footerDesc:
      "Налайх хотын хөгжлийн корпораци - Байгальд ээлтэй хот байгуулалтын тэргүүлэгч.",
    projectsFooter: "Төслүүд",
    greenNalaikhFooter: "Ногоон Налайх",
    housing: "Орон сууцжуулалт",
    infrastructure: "Дэд бүтэц",
    consulting: "Зөвлөх үйлчилгээ",
    corporationFooter: "Корпораци",
    aboutUs: "Бидний тухай",
    careers: "Ажлын байр",
    news: "Мэдээ",
    copyright:
      "© 2025 Налайх хотын хөгжлийн корпораци ОНӨААТҮГ. Бүх эрх хуулиар хамгаалагдсан.",
    waterFeatures: "Усны онцлог",
    waterFeaturesDesc:
      "Цөөрөм, усан сан, усан парк болон бусад усны элементүүд",
    housingChallenge: "Орон сууцны бэрхшээл",
    housingChallengeDesc:
      "Налайх хотын орон сууцны хангамж, эрэлтийн өнөөгийн байдал",
    totalHouseholds: "Нийт өрх",
    totalHouseholdsDesc: "Налайх хотод амьдарч буй нийт өрхийн тоо",
    integratedApproach: "Нэгдсэн арга барил",
    getInTouch: "Холбоо барих",
    name: "Нэр",
    message: "Зурвас",
    sendMessage: "Илгээх",
    allRightsReserved: "Бүх эрх хуулиар хамгаалагдсан",
    housingDevelopment: "Орон сууцны хөгжил",
    services: "Үйлчилгээ",
    urbanPlanning: "Хот төлөвлөлт",
    sustainableDevelopment: "Тогтвортой хөгжил",
    officeLocation: "Оффисын байршил",
    phoneContact: "Утасны дугаар",
    emailContact: "Имэйл хаяг",
    businessHours: "Ажлын цаг",
    responseTime: "Хариу өгөх хугацаа",
    partnershipOpportunities: "Хамтын ажиллагааны боломжууд",
    partnershipDesc:
      "Бид ногоон санхүүжилт, тогтвортой хөгжил, хот төлөвлөлтийн чиглэлээр хамтран ажиллах боломжуудыг эрэлхийлж байна.",
  },
  en: {
    company: "Nalaikh City Development Corporation",
    greenNalaikh: "Green Nalaikh",
    projects: "Projects",
    financing: "Financing",
    contact: "Contact",
    getQuote: "Get Quote",
    ecoFriendlyCity: "Eco-Friendly City",
    heroTitle: "GREEN NALAIKH",
    heroDescription:
      'Eco-friendly urban development. The "Green Nalaikh" project by Nalaikh City Development Corporation LLC is an innovative solution that integrates sustainable development, ecosystem protection, and green technology.',
    viewProjects: "View Projects",
    learnMore: "Learn More",

    // Green Nalaikh Components
    greenComponents: '"Green Nalaikh" Project Components',
    greenComponentsDesc:
      "Comprehensive eco-friendly urban development solution",
    greenZone: "Green Zone",
    greenZoneDesc: "Public trees, shrubs, lawns, flowers, and greenhouses",
    waterPoints: "Water Features",
    waterPointsDesc: "Ponds, reservoirs, water parks and other water elements",
    ecoEducation: "Eco Education",
    ecoEducationDesc:
      '"Green Nalaikh" eco-education system and supporting infrastructure',
    greenTech: "Green Technology",
    greenTechDesc:
      "Buildings, housing, roads and spaces integrated with green technology",

    // Project Outcomes
    strategicResults: "Strategic Results",
    projectOutcomes: "Major outcomes from coordinated project implementation",
    projectOutcomesDesc:
      "Integrated approach projects will transform Nalaikh into a modern, sustainable city.",
    industrialPark: "Industrial Technology Park",
    industrialParkDesc: "Modern technology and innovation center",
    urbanDevelopment: "Urban Development & Housing",
    urbanDevelopmentDesc: "Modern housing and infrastructure",
    economicZone: "Special Economic Zone",
    economicZoneDesc: "Investment and business environment",
    greenNalaikhProject: "Green Nalaikh",
    greenNalaikhDesc: "Eco-friendly, sustainable development",

    // Benefits
    benefitsTitle: "Benefits from these projects",
    benefitsDesc: "Impact on Nalaikh city's economic and social development",
    greenFinancing: "Attract green financing",
    greenFinancingDesc:
      "Opportunity to attract funding from international green funds",
    exportSupport: "Export support improvement",
    exportSupportDesc: "Increase in manufactured product exports",
    jobCreation: "Increased labor demand",
    jobCreationDesc: "New jobs and professional development",
    newTechnology: "New technology introduction",
    newTechnologyDesc: "Innovation and digital transformation",

    // Statistics
    projectCoordination: "Project coordination",
    projectCoordinationDesc: "Inter-project coordination ensured",
    livingEnvironment: "Comfortable living environment",
    livingEnvironmentDesc: "City appearance improved",
    developmentModel: "Development model",
    developmentModelDesc: "Create exemplary model",

    // Housing Statistics
    housingStats: "Housing Statistics",
    housingShortage: "Housing shortage",
    downPaymentCapable: "Down payment capable",
    downPaymentCapableDesc:
      "With social insurance, salary income, down payment, collateral assets",
    noDownPayment: "No down payment savings",
    noDownPaymentDesc:
      "Verified by social insurance and salary income but lacking down payment",
    mortgageDemand: "households - Mortgage loan demand",
    totalBorrowers: "Total borrowers:",
    normalLoans: "Normal loans:",
    badLoans: "Bad loans:",
    totalRisk: "Total risk amount",

    // Financing Solutions
    financingSolutions: "Financing Solutions",
    financingSolutionsDesc:
      "Compound interest-free, cost-effective corporate financing",
    constructionFinancing: "Construction Financing & Corporate Financing",
    currentProblem: "Current problem:",
    currentProblemDesc:
      "Construction project implementing entities solve required financing during construction period by taking commercial loans from banking and financial institutions. Commercial loans have 23% annual interest rate.",
    solution: "Solution:",
    solutionDesc:
      "If we include citizens in mortgage loans from the beginning of construction, this interest issue will be resolved.",
    priceComparison: "Price comparison",
    bankLoanPrice: "Price after bank loan:",
    preOrderPrice: "Pre-order price:",
    actualSavings: "Actual savings: ₮76,000,000",

    // Four Solutions
    downPaymentInsurance: "Down payment insurance",
    downPaymentInsuranceDesc:
      "Youth-friendly housing program with insurance and guarantee scheme",
    corporateFinancing: "Corporate financing",
    corporateFinancingDesc: "Compound interest-free, cost-effective",
    fundingSources: "Funding sources",
    fundingSourcesDesc: "Adequate and independent",
    passiveHousing: "Passive standard housing",
    passiveHousingDesc:
      "Green financing GCF, ADB, JICA. EU Passive House standard",

    // Implementation Timeline
    implementationTimeline: "Implementation Timeline",
    step1: "Project development",
    step2: "Approach funding organizations",
    step3: "Project consulting services",
    step4: "Obtain project financing",
    step5: "Project implementation",

    // Contact & Footer
    contactUs: "Contact Us",
    contactDesc: "Nalaikh City Development Corporation LLC",
    phone: "Phone",
    email: "Email",
    address: "Address",
    addressText: "Nalaikh District\nUlaanbaatar, Mongolia",
    footerDesc:
      "Nalaikh City Development Corporation - Leader in eco-friendly urban development.",
    projectsFooter: "Projects",
    greenNalaikhFooter: "Green Nalaikh",
    housing: "Housing",
    infrastructure: "Infrastructure",
    consulting: "Consulting",
    corporationFooter: "Corporation",
    aboutUs: "About Us",
    careers: "Careers",
    news: "News",
    copyright:
      "© 2025 Nalaikh City Development Corporation LLC. All rights reserved.",
    waterFeatures: "Water Features",
    waterFeaturesDesc:
      "Ponds, reservoirs, water parks and other water elements",
    housingChallenge: "Housing Challenge",
    housingChallengeDesc:
      "Current state of housing supply and demand in Nalaikh city",
    totalHouseholds: "Total Households",
    totalHouseholdsDesc: "Total number of households residing in Nalaikh city",
    integratedApproach: "Integrated Approach",
    getInTouch: "Get in touch",
    name: "Name",
    message: "Message",
    sendMessage: "Send Message",
    allRightsReserved: "All rights reserved",
    housingDevelopment: "Housing Development",
    services: "Services",
    urbanPlanning: "Urban Planning",
    sustainableDevelopment: "Sustainable Development",
    officeLocation: "Office Location",
    phoneContact: "Phone Contact",
    emailContact: "Email Contact",
    businessHours: "Business Hours",
    responseTime: "Response Time",
    partnershipOpportunities: "Partnership Opportunities",
    partnershipDesc:
      "We are looking for opportunities to collaborate in green financing, sustainable development, and urban planning.",
  },
  zh: {
    company: "纳来哈市发展公司",
    greenNalaikh: "绿色纳来哈",
    projects: "项目",
    financing: "融资",
    contact: "联系我们",
    getQuote: "获取报价",
    ecoFriendlyCity: "生态友好城市",
    heroTitle: "绿色纳来哈",
    heroDescription:
      '生态友好的城市发展。纳来哈市发展公司有限责任公司的"绿色纳来哈"项目是一个创新解决方案，整合了可持续发展、生态系统保护和绿色技术。',
    viewProjects: "查看项目",
    learnMore: "了解更多",

    // Green Nalaikh Components
    greenComponents: '"绿色纳来哈"项目组成部分',
    greenComponentsDesc: "全面的生态友好城市发展解决方案",
    greenZone: "绿色区域",
    greenZoneDesc: "公共树木、灌木、草坪、花卉和温室",
    waterPoints: "水景设施",
    waterPointsDesc: "池塘、水库、水上公园等水体元素",
    ecoEducation: "生态教育",
    ecoEducationDesc: '"绿色纳来哈"生态教育系统和配套基础设施',
    greenTech: "绿色技术",
    greenTechDesc: "融入绿色技术的建筑、住房、道路和空间",

    // Project Outcomes
    strategicResults: "战略成果",
    projectOutcomes: "协调项目实施的重大成果",
    projectOutcomesDesc:
      "综合方法项目将把纳来哈转变为现代化、可持续发展的城市。",
    industrialPark: "工业技术园区",
    industrialParkDesc: "现代技术和创新中心",
    urbanDevelopment: "城市发展与住房",
    urbanDevelopmentDesc: "现代住房和基础设施",
    economicZone: "经济特区",
    economicZoneDesc: "投资和商业环境",
    greenNalaikhProject: "绿色纳来哈",
    greenNalaikhDesc: "生态友好、可持续发展",

    // Benefits
    benefitsTitle: "这些项目的效益",
    benefitsDesc: "对纳来哈市经济和社会发展的影响",
    greenFinancing: "吸引绿色融资",
    greenFinancingDesc: "从国际绿色基金吸引资金的机会",
    exportSupport: "出口支持改善",
    exportSupportDesc: "制成品出口增加",
    jobCreation: "劳动力需求增加",
    jobCreationDesc: "新就业机会和专业发展",
    newTechnology: "新技术引入",
    newTechnologyDesc: "创新和数字化转型",

    // Statistics
    projectCoordination: "项目协调",
    projectCoordinationDesc: "确保项目间协调",
    livingEnvironment: "舒适的生活环境",
    livingEnvironmentDesc: "城市面貌改善",
    developmentModel: "发展模式",
    developmentModelDesc: "创建示范模式",

    // Housing Statistics
    housingStats: "住房统计",
    housingShortage: "住房短缺",
    downPaymentCapable: "有首付能力",
    downPaymentCapableDesc: "有社会保险、工资收入、首付、抵押资产",
    noDownPayment: "无首付储蓄",
    noDownPaymentDesc: "通过社会保险和工资收入验证但缺乏首付",
    mortgageDemand: "户 - 抵押贷款需求",
    totalBorrowers: "总借款人：",
    normalLoans: "正常贷款：",
    badLoans: "不良贷款：",
    totalRisk: "总风险金额",

    // Financing Solutions
    financingSolutions: "融资解决方案",
    financingSolutionsDesc: "无复利、成本效益的企业融资",
    constructionFinancing: "建设融资与企业融资",
    currentProblem: "当前问题：",
    currentProblemDesc:
      "建设项目实施实体通过从银行和金融机构获得商业贷款来解决建设期间所需的融资。商业贷款年利率为23%。",
    solution: "解决方案：",
    solutionDesc:
      "如果我们从建设开始就将公民纳入抵押贷款，这个利息问题就会得到解决。",
    priceComparison: "价格比较",
    bankLoanPrice: "银行贷款后价格：",
    preOrderPrice: "预订价格：",
    actualSavings: "实际节省：₮76,000,000",

    // Four Solutions
    downPaymentInsurance: "首付保险",
    downPaymentInsuranceDesc: "青年友好住房计划，配有保险和担保方案",
    corporateFinancing: "企业融资",
    corporateFinancingDesc: "无复利、成本效益",
    fundingSources: "资金来源",
    fundingSourcesDesc: "充足且独立",
    passiveHousing: "被动式标准住房",
    passiveHousingDesc: "绿色融资 GCF、ADB、JICA。欧盟被动式房屋标准",

    // Implementation Timeline
    implementationTimeline: "实施时间表",
    step1: "项目开发",
    step2: "接洽资助机构",
    step3: "项目咨询服务",
    step4: "获得项目融资",
    step5: "项目实施",

    // Contact & Footer
    contactUs: "联系我们",
    contactDesc: "纳来哈市发展公司有限责任公司",
    phone: "电话",
    email: "邮箱",
    address: "地址",
    addressText: "纳来哈区\n乌兰巴托，蒙古国",
    footerDesc: "纳来哈市发展公司 - 生态友好城市发展的领导者。",
    projectsFooter: "项目",
    greenNalaikhFooter: "绿色纳来哈",
    housing: "住房",
    infrastructure: "基础设施",
    consulting: "咨询",
    corporationFooter: "公司",
    aboutUs: "关于我们",
    careers: "职业",
    news: "新闻",
    copyright: "© 2025 纳来哈市发展公司有限责任公司。保留所有权利。",
    waterFeatures: "水景设施",
    waterFeaturesDesc: "池塘、水库、水上公园等水体元素",
    housingChallenge: "住房挑战",
    housingChallengeDesc: "纳来哈市住房供需现状",
    totalHouseholds: "总户数",
    totalHouseholdsDesc: "居住在纳来哈市的总户数",
    integratedApproach: "综合方法",
    getInTouch: "联系",
    name: "姓名",
    message: "信息",
    sendMessage: "发送信息",
    allRightsReserved: "版权所有",
    housingDevelopment: "住房开发",
    services: "服务",
    urbanPlanning: "城市规划",
    sustainableDevelopment: "可持续发展",
    officeLocation: "办公地点",
    phoneContact: "电话联系",
    emailContact: "电子邮件联系",
    businessHours: "营业时间",
    responseTime: "响应时间",
    partnershipOpportunities: "合作机会",
    partnershipDesc:
      "我们正在寻找在绿色金融、可持续发展和城市规划方面合作的机会。",
  },
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("mn")
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const t = translations[language]

  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId)
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" })
  //   }
  // }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 dark:bg-nalaikh-navy/95 dark:supports-[backdrop-filter]:bg-nalaikh-navy/90 dark:border-nalaikh-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center divide-x divide-accent dark:text-nalaikh-gold space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-full w-2 bg-gray-900 dark:bg-nalaikh-gold" />
                <Image
                  src={NcdcLogo.src}
                  alt="NCDC Logo"
                  width={40}
                  height={40}
                />
                <div>
                  <span className="text-lg font-bold text-gray-900 dark:text-nalaikh-gold">
                    NCDC
                  </span>
                  <div className="text-xs text-gray-600 dark:text-nalaikh-gold/80">
                    {t.company}
                  </div>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {[
                { key: "greenNalaikh", href: "#green-nalaikh" },
                { key: "projects", href: "#projects" },
                { key: "housing", href: "#housing" },
                { key: "financing", href: "#financing" },
                { key: "contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-gray-600 hover:text-nalaikh-navy transition-colors dark:text-nalaikh-gold/80 dark:hover:text-nalaikh-gold"
                  onClick={(e) => {
                    e.preventDefault()
                    document
                      .querySelector(item.href)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t[item.key as keyof typeof t]}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <Select
                value={language}
                onValueChange={(value: Language) => setLanguage(value)}
              >
                <SelectTrigger className="w-20 dark:bg-nalaikh-navy/50 dark:border-nalaikh-gold/30 dark:text-nalaikh-gold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-nalaikh-navy dark:border-nalaikh-gold/30">
                  <SelectItem
                    value="mn"
                    className="dark:text-nalaikh-gold dark:focus:bg-nalaikh-gold/20"
                  >
                    MN
                  </SelectItem>
                  <SelectItem
                    value="en"
                    className="dark:text-nalaikh-gold dark:focus:bg-nalaikh-gold/20"
                  >
                    EN
                  </SelectItem>
                  <SelectItem
                    value="zh"
                    className="dark:text-nalaikh-gold dark:focus:bg-nalaikh-gold/20"
                  >
                    中文
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="dark:border-nalaikh-gold/30 dark:text-nalaikh-gold dark:hover:bg-nalaikh-gold/20"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-nalaikh-light-grey to-blue-50 py-20 dark:from-nalaikh-navy dark:to-gray-900 dark:bg-gradient-to-br">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent dark:from-nalaikh-gold/10 dark:to-transparent"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-30"
          style={{ backgroundImage: `url(${CityImage.src})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="mb-8">
              <Badge className="mb-4 bg-nalaikh-gold/20 text-nalaikh-navy hover:bg-nalaikh-gold/30 dark:bg-nalaikh-gold/30 dark:text-nalaikh-navy dark:hover:bg-nalaikh-gold/40">
                {t.ecoFriendlyCity}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight dark:text-nalaikh-gold">
                {t.heroTitle}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed dark:text-nalaikh-gold/80">
                {t.heroDescription}
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-nalaikh-navy hover:bg-nalaikh-navy/90 dark:bg-nalaikh-gold dark:text-nalaikh-navy dark:hover:bg-nalaikh-gold/90"
                >
                  {t.learnMore}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-nalaikh-navy text-nalaikh-navy hover:bg-nalaikh-navy hover:text-white bg-transparent dark:border-nalaikh-gold dark:text-nalaikh-gold dark:hover:bg-nalaikh-gold dark:hover:text-nalaikh-navy"
                >
                  {t.viewProjects}
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Green Nalaikh Components */}
      <section id="green-nalaikh" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-nalaikh-gold">
              {t.greenComponents}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              {t.greenComponentsDesc}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 dark:hover:bg-nalaikh-navy/30">
              <CardHeader>
                <TreePine className="h-10 w-10 text-green-600 mb-4 dark:text-nalaikh-gold" />
                <CardTitle className="dark:text-nalaikh-gold">
                  {t.greenZone}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.greenZoneDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 dark:hover:bg-nalaikh-navy/30">
              <CardHeader>
                <Waves className="h-10 w-10 text-blue-600 mb-4 dark:text-nalaikh-gold" />
                <CardTitle className="dark:text-nalaikh-gold">
                  {t.waterFeatures}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.waterFeaturesDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 dark:hover:bg-nalaikh-navy/30">
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-purple-600 mb-4 dark:text-nalaikh-gold" />
                <CardTitle className="dark:text-nalaikh-gold">
                  {t.ecoEducation}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.ecoEducationDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 dark:hover:bg-nalaikh-navy/30">
              <CardHeader>
                <Leaf className="h-10 w-10 text-green-500 mb-4 dark:text-nalaikh-gold" />
                <CardTitle className="dark:text-nalaikh-gold">
                  {t.greenTech}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.greenTechDesc}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Outcomes */}
      <section
        id="projects"
        className="py-20 bg-gradient-to-br from-nalaikh-navy to-blue-900 dark:from-gray-900 dark:to-nalaikh-navy relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-nalaikh-gold/20 text-nalaikh-gold border-nalaikh-gold/30">
              {t.integratedApproach}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 dark:text-nalaikh-gold">
              {t.projectOutcomes}
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto dark:text-gray-300">
              {t.projectOutcomesDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardHeader className="text-center pb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-nalaikh-gold to-yellow-400 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <Factory className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-nalaikh-red rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-white mb-3">
                  {t.industrialPark}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {t.industrialParkDesc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardHeader className="text-center pb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-nalaikh-red rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-white mb-3">
                  {t.urbanDevelopment}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {t.urbanDevelopmentDesc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardHeader className="text-center pb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-nalaikh-red rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-white mb-3">
                  {t.economicZone}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {t.economicZoneDesc}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardHeader className="text-center pb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                    <TreePine className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-nalaikh-red rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">4</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-white mb-3">
                  {t.greenNalaikhProject}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {t.greenNalaikhDesc}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-nalaikh-gold mb-4">
                {t.benefitsTitle}
              </h3>
              <p className="text-blue-100">{t.benefitsDesc}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-nalaikh-gold to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">💰</span>
                </div>
                <h4 className="text-base font-bold mb-2 text-white">
                  {t.greenFinancing}
                </h4>
                <p className="text-sm text-blue-100">{t.greenFinancingDesc}</p>
              </div>

              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">📈</span>
                </div>
                <h4 className="text-base font-bold mb-2 text-white">
                  {t.exportSupport}
                </h4>
                <p className="text-sm text-blue-100">{t.exportSupportDesc}</p>
              </div>

              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">👥</span>
                </div>
                <h4 className="text-base font-bold mb-2 text-white">
                  {t.jobCreation}
                </h4>
                <p className="text-sm text-blue-100">{t.jobCreationDesc}</p>
              </div>

              <div className="text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🚀</span>
                </div>
                <h4 className="text-base font-bold mb-2 text-white">
                  {t.newTechnology}
                </h4>
                <p className="text-sm text-blue-100">{t.newTechnologyDesc}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-nalaikh-gold mb-2">
                  5+
                </div>
                <div className="text-white font-semibold mb-1">
                  {t.projectCoordination}
                </div>
                <div className="text-sm text-blue-100">
                  {t.projectCoordinationDesc}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-nalaikh-gold mb-2">
                  100%
                </div>
                <div className="text-white font-semibold mb-1">
                  {t.livingEnvironment}
                </div>
                <div className="text-sm text-blue-100">
                  {t.livingEnvironmentDesc}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-nalaikh-gold mb-2">
                  ∞
                </div>
                <div className="text-white font-semibold mb-1">
                  {t.developmentModel}
                </div>
                <div className="text-sm text-blue-100">
                  {t.developmentModelDesc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Housing Statistics */}
      <section id="housing" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-nalaikh-gold">
              {t.housingChallenge}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              {t.housingChallengeDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-0 shadow-lg dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20">
              <CardHeader>
                <div className="text-4xl font-bold text-nalaikh-navy mb-2 dark:text-nalaikh-gold">
                  15,000
                </div>
                <CardTitle className="text-lg dark:text-white">
                  {t.totalHouseholds}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.totalHouseholdsDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-0 shadow-lg dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20">
              <CardHeader>
                <div className="text-4xl font-bold text-nalaikh-red mb-2 dark:text-nalaikh-gold">
                  35%
                </div>
                <CardTitle className="text-lg dark:text-white">
                  {t.downPaymentCapable}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.downPaymentCapableDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center border-0 shadow-lg dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20">
              <CardHeader>
                <div className="text-4xl font-bold text-nalaikh-navy mb-2 dark:text-nalaikh-gold">
                  87%
                </div>
                <CardTitle className="text-lg dark:text-white">
                  {t.noDownPayment}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.noDownPaymentDesc}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg dark:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-nalaikh-navy dark:text-nalaikh-gold">
                  15,000
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.housingShortage}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-xl lg:text-2xl font-bold text-green-600">
                      35%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {t.downPaymentCapable}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t.downPaymentCapableDesc}
                    </div>
                  </div>
                  <div>
                    <div className="text-xl lg:text-2xl font-bold text-orange-600">
                      87%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {t.noDownPayment}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {t.noDownPaymentDesc}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-blue-600">
                  70,000
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.mortgageDemand}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="dark:text-gray-300">
                      {t.totalBorrowers}
                    </span>
                    <span className="font-bold dark:text-white">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-gray-300">{t.normalLoans}</span>
                    <span className="font-bold text-green-600">98.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-gray-300">{t.badLoans}</span>
                    <span className="font-bold text-red-600">1.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl lg:text-3xl font-bold text-nalaikh-red">
                  ₮ 5.4 ТБ
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {t.totalRisk}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm dark:text-gray-300">
                  <div>10,000 өрхийн 1.8% нь чанаргүй зээлдэгч</div>
                  <div>20 жилийн хугацаанд 180 өрх чанаргүй зээлдэгч болно</div>
                  <div>Нэг өрхийн ипотекийн зээл: ₮100 сая</div>
                  <div>Нэг чанаргүй зээлээс: ₮30 сая эрсдэл</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financing Solutions */}
      <section id="financing" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-nalaikh-gold">
              {t.financingSolutions}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              {t.financingSolutionsDesc}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 dark:text-white">
                {t.constructionFinancing}
              </h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg dark:bg-red-900/20">
                  <div className="text-base lg:text-lg font-bold text-red-600 mb-2">
                    {t.currentProblem}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {t.currentProblemDesc}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg dark:bg-green-900/20">
                  <div className="text-base lg:text-lg font-bold text-green-600 mb-2">
                    {t.solution}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {t.solutionDesc}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">
                    {t.priceComparison}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded dark:bg-red-900/20">
                      <span className="dark:text-gray-300">
                        {t.bankLoanPrice}
                      </span>
                      <span className="font-bold text-red-600">
                        ₮240,000,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded dark:bg-green-900/20">
                      <span className="dark:text-gray-300">
                        {t.preOrderPrice}
                      </span>
                      <span className="font-bold text-green-600">
                        ₮164,000,000
                      </span>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded dark:bg-blue-900/20">
                      <div className="text-base lg:text-lg font-bold text-blue-600">
                        {t.actualSavings}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-nalaikh-navy dark:text-nalaikh-gold">
                  01
                </CardTitle>
                <CardDescription className="text-center font-bold dark:text-gray-300">
                  {t.downPaymentInsurance}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center dark:text-gray-300">
                  {t.downPaymentInsuranceDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-nalaikh-navy dark:text-nalaikh-gold">
                  02
                </CardTitle>
                <CardDescription className="text-center font-bold dark:text-gray-300">
                  {t.corporateFinancing}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center dark:text-gray-300">
                  {t.corporateFinancingDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-nalaikh-navy dark:text-nalaikh-gold">
                  03
                </CardTitle>
                <CardDescription className="text-center font-bold dark:text-gray-300">
                  {t.fundingSources}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center dark:text-gray-300">
                  {t.fundingSourcesDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-nalaikh-navy dark:text-nalaikh-gold">
                  04
                </CardTitle>
                <CardDescription className="text-center font-bold dark:text-gray-300">
                  {t.passiveHousing}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center dark:text-gray-300">
                  {t.passiveHousingDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              {t.implementationTimeline}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                1
              </div>
              <div className="font-semibold dark:text-white">{t.step1}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                2
              </div>
              <div className="font-semibold dark:text-white">{t.step2}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                3
              </div>
              <div className="font-semibold dark:text-white">{t.step3}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                4
              </div>
              <div className="font-semibold dark:text-white">{t.step4}</div>
            </div>
            <ArrowRight className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-nalaikh-navy text-white rounded-full flex items-center justify-center font-bold mb-2 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                5
              </div>
              <div className="font-semibold dark:text-white">{t.step5}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-nalaikh-gold">
                {t.contact}
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t.contactDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Office Location */}
              <Card className="border-0 shadow-xl bg-white dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-nalaikh-navy/10 dark:bg-nalaikh-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-nalaikh-navy dark:text-nalaikh-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-nalaikh-gold">
                    {t.officeLocation}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t.address}
                  </p>
                </CardContent>
              </Card>

              {/* Phone Contact */}
              <Card className="border-0 shadow-xl bg-white dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-nalaikh-navy/10 dark:bg-nalaikh-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-nalaikh-navy dark:text-nalaikh-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-nalaikh-gold">
                    {t.phoneContact}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                    +976 7755 85888
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    {t.businessHours}
                  </p>
                </CardContent>
              </Card>

              {/* Email Contact */}
              <Card className="border-0 shadow-xl bg-white dark:bg-nalaikh-navy/20 dark:border-nalaikh-gold/20 hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-nalaikh-navy/10 dark:bg-nalaikh-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-nalaikh-navy dark:text-nalaikh-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 dark:text-nalaikh-gold">
                    {t.emailContact}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                    info@ncdc.mn
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    {t.responseTime}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Additional Contact Information */}
            <div className="mt-16 text-center">
              <div className="bg-nalaikh-navy/5 dark:bg-nalaikh-gold/10 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 dark:text-nalaikh-gold">
                  {t.partnershipOpportunities}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {t.partnershipDesc}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white dark:bg-nalaikh-navy/30 px-6 py-3 rounded-full shadow-md">
                    <span className="text-nalaikh-navy dark:text-nalaikh-gold font-medium">
                      {t.greenFinancing}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-nalaikh-navy/30 px-6 py-3 rounded-full shadow-md">
                    <span className="text-nalaikh-navy dark:text-nalaikh-gold font-medium">
                      {t.sustainableDevelopment}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-nalaikh-navy/30 px-6 py-3 rounded-full shadow-md">
                    <span className="text-nalaikh-navy dark:text-nalaikh-gold font-medium">
                      {t.urbanPlanning}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nalaikh-navy text-white py-12 dark:bg-gray-900 dark:border-t dark:border-nalaikh-gold/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={NcdcLogo.src}
                  alt="NCDC Logo"
                  width={40}
                  height={40}
                />
                <span className="text-lg font-bold dark:text-nalaikh-gold">
                  NCDC
                </span>
              </div>
              <p className="text-blue-100 dark:text-gray-300">{t.company}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 dark:text-nalaikh-gold">
                {t.projects}
              </h4>
              <ul className="space-y-2 text-blue-100 dark:text-gray-300">
                <li>{t.greenNalaikh}</li>
                <li>{t.industrialPark}</li>
                <li>{t.housingDevelopment}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 dark:text-nalaikh-gold">
                {t.services}
              </h4>
              <ul className="space-y-2 text-blue-100 dark:text-gray-300">
                <li>{t.urbanPlanning}</li>
                <li>{t.greenFinancing}</li>
                <li>{t.sustainableDevelopment}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 dark:text-nalaikh-gold">
                {t.contact}
              </h4>
              <div className="space-y-2 text-blue-100 dark:text-gray-300">
                <p>{t.address}</p>
                <p>+976 7755 85888</p>
                <p>info@ncdc.mn</p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 dark:border-nalaikh-gold/20 mt-8 pt-8 text-center">
            <p className="text-blue-100 dark:text-gray-300">
              © 2025 {t.company}. {t.allRightsReserved}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
