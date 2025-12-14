import { CompanyDocument } from './company.schema'
import { CompanyDto } from './dto/company.dto'

export class CompanyMapper {
  static toDto(company: CompanyDocument): CompanyDto {
    return {
      _id: company._id.toString(),
      name: company.name,
      website: company.website,
      city: company.city,
      country: company.country,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    }
  }

  static toDtos(companies: CompanyDocument[]): CompanyDto[] {
    return companies.map((company) => this.toDto(company))
  }
}
