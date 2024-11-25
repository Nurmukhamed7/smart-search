// Тип для параметров запроса
export interface IQueryParams {
	LangParam?: 'en' | 'pl' | 'de' | 'ru' | 'uk'
	include?: number[]
	slug?: string
	ids?: number[]
	search?: string
	lang?: string
}

// Тип для данных категорий
export interface ICustomDataCategories {
	success: boolean
	data: {
		items: ICategory[] // Тип для категории
	}
}

// Пример типа для ICategory
export interface ICategory {
	id: number
	name: string
	slug: string
	// Дополнительные поля, если нужны
}

// Тип для данных продуктов
export interface ICustomDataProducts {
	success: boolean
	data: {
		statistic: ICustomDataProductsStatistic
		items: IProduct[] // Массив продуктов
	}
}

// Тип для статистики продуктов
export interface ICustomDataProductsStatistic {
	products_count: number
	min_price: number
	max_price: number
	attributes: IAttribute[]
}

// Тип для атрибутов продукта
export interface IAttribute {
	id: number
	name: string
	value: string | number
}

// Тип для продукта
export interface IProduct {
	id: number
	sku: string
	slug: string
	name: string
	description: string
	attributes: IAttribute[]
	average_rating: number
	categories: ICategory[]
	created: string
	modified: string
	default_attributes: IAttribute[]
	language_code: string
	max_price: number
	min_price: number
	stock_quantity: number
	type: string
	variations: IProductVariation[]
	thumbnail: string | null
	images: IImage[]
}

export interface IProductVariation {
	id: number
	name: string
	slug: string
}

export interface IImage {
	id: number
	imageUrl: string
	altText?: string
}

// Тип для одного продукта
export interface ICustomDataAndProduct {
	success: boolean
	data: {
		item: IProduct // Один продукт
	}
}
