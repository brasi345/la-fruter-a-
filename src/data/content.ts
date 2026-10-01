export interface BusinessInfo {
  name: string;
  type: string;
  city: string;
  address: string;
  postalCode: string;
  fullAddress: string;
  phone: string;
  phoneTel: string;
  rating: string;
  googleMapsUrl: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: "LA FRUTERÍA",
  type: "Frutería",
  city: "Murcia",
  address: "C. Torre Álvarez, 7",
  postalCode: "30007 Murcia",
  fullAddress: "C. Torre Álvarez, 7, 30007 Murcia",
  phone: "630 88 19 31",
  phoneTel: "tel:+34630881931",
  rating: "4,9 ★",
  googleMapsUrl: "https://maps.app.goo.gl/MZ6ARhux9Q2szEDt7",
};

export interface ScheduleDay {
  day: string;
  hours: string;
  closed?: boolean;
}

export const SCHEDULE: ScheduleDay[] = [
  { day: "Lunes", hours: "09:30–14:30 · 17:30–21:00" },
  { day: "Martes", hours: "09:30–14:30 · 17:30–21:00" },
  { day: "Miércoles", hours: "09:30–14:30 · 17:30–21:00" },
  { day: "Jueves", hours: "09:30–14:30 · 17:30–21:00" },
  { day: "Viernes", hours: "09:30–14:30 · 17:30–21:00" },
  { day: "Sábado", hours: "09:30–14:30" },
  { day: "Domingo", hours: "CERRADO", closed: true },
];

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  aspect: string;
}

export const REAL_PHOTOS: GalleryPhoto[] = [
  {
    id: "portada-principal",
    src: "/images/store_local_murcia_1790847737040.jpg",
    alt: "Fachada e interior de La Frutería en C. Torre Álvarez, 7, Murcia",
    title: "La Frutería",
    caption: "C. Torre Álvarez, 7 · Murcia",
    aspect: "16/9",
  },
  {
    id: "expositor-cajas-madera",
    src: "/images/market_crates_fresh_1790847721292.jpg",
    alt: "Expositor de madera con fresas, nísperos, piñas, mangos y mandarinas en La Frutería",
    title: "Expositor de fruta",
    caption: "Fresas, piñas, nísperos, mangos y mandarinas en cajas de madera",
    aspect: "4/3",
  },
  {
    id: "expositor-aguacates-hortalizas",
    src: "/images/display_avocados_berries_1790849736414.jpg",
    alt: "Puesto con aguacates, col kale, arándanos, frambuesas, zanahorias y pitahayas",
    title: "Variedad en mostrador",
    caption: "Aguacates, frutos del bosque, pitahayas y verduras frescas",
    aspect: "4/3",
  },
  {
    id: "cesta-fruta-preparada",
    src: "/images/gourmet_fruit_box_1790847749926.jpg",
    alt: "Caja de fruta con melón, uvas, plátanos, manzanas y fresas de La Frutería",
    title: "Caja de fruta preparada",
    caption: "Melón, uvas, plátanos, manzanas y fresas con presentación cuidada",
    aspect: "4/3",
  },
  {
    id: "detalle-citricos",
    src: "/images/hero_citrus_splash_1790847707709.jpg",
    alt: "Detalle fotográfico de cítricos y frutas de La Frutería",
    title: "Fruta seleccionada",
    caption: "Cítricos, fresas y fruta fresca de mostrador",
    aspect: "16/10",
  },
];

// Visible products identified in photographs
export const VISIBLE_PRODUCTS = [
  "Fresas",
  "Piñas",
  "Aguacates",
  "Zanahorias",
  "Mandarinas y Naranjas",
  "Limones",
  "Plátanos",
  "Uvas",
  "Nísperos",
  "Mangos",
  "Pitahayas amarillas",
  "Arándanos y Frambuesas",
  "Melones",
  "Col Kale",
  "Manzanas",
];
