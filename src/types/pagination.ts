export interface IPaginationResponse {
	total: number
	limit: number
	page: number
	total_pages: number
}

export class PaginationDataResponse<T> {
	data: T[]
	pagination?: IPaginationResponse

	constructor(data: T[], total?: number, page?: number, limit?: number) {
		this.data = data

		if (total && total > 0) {
			this.pagination = {
				total,
				limit,
				page,
				total_pages: Math.round(total / limit)
			}
		}
	}
}
