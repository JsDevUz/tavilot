import uz from '../../public/assets/tr/uz-UZ.json';
import ru from '../../public/assets/tr/ru-RU.json';

const fletUz = {
  goBack: 'Orqaga qaytish',
  abuMansurMotrudiy: 'Abu Mansur Motrudiy',
  tavilotAlQuran: "Ta'vilot Al-Quron",
  manuscriptAndComments: "Qo'lyozma va sharhlar",
  modernStudies: 'Zamonaviy tadqiqotlar',
  resources: "Resurslar: O'quv qo'llanmalari va ilmiy manba'lar",
  resourcesStudyGuides: "Resurslar: O'quv qo'llanmalari va ilmiy manba'lar",
  rebuttalsToFanaticism: "Mutaassib oqimlarga raddiyalar",
  search: 'Qidirish...',
  chapters: 'Surah',
  juzes: 'Juz',
  arabic: 'Arabcha',
  translate: 'Tarjima',
  surahDescription: 'Tafsir',
  open: 'Ochish',
  close: 'Yopish',
  verse: 'oyat',
};

const fletKr = {
  goBack: 'Оркага кайтиш',
  abuMansurMotrudiy: 'Абу Мансур Мотрудий',
  tavilotAlQuran: 'Тавилот Ал-Курон',
  manuscriptAndComments: 'Колйозма ва шархлар',
  modernStudies: 'Замонавий тадкикотлар',
  resources: 'Ресурслар: Окув колланмалари ва илмий манбалар',
  resourcesStudyGuides: 'Ресурслар: Окув колланмалари ва илмий манбалар',
  rebuttalsToFanaticism: 'Мутаассиб окимларга раддиялар',
  search: 'Кидириш...',
  chapters: 'Сура',
  juzes: 'Жуз',
  arabic: 'Арабча',
  translate: 'Таржима',
  surahDescription: 'Тафсир',
  open: 'Очиш',
  close: 'Йопиш',
  verse: 'оят',
};

const dictionaries = {
  uz: { ...uz, ...fletUz },
  kr: { ...uz, ...fletKr },
  ru: { ...ru, ...fletUz },
  en: { ...uz, ...fletUz },
  tr: { ...uz, ...fletUz },
  ar: { ...uz, ...fletUz },
};

export function t(lang, key) {
  return dictionaries[lang]?.[key] || dictionaries.uz[key] || key;
}
