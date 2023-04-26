import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  async create(newProduct: CreateProductDto) {
    const product = new Product();

    product.name = newProduct.name;
    product.category = newProduct.category;
    product.type = newProduct.type;
    product.description = newProduct.description;
    product.price = newProduct.price;
    product.image = newProduct.image;
    product.forGift = newProduct.forGift;
    product.onHomePage = newProduct.onHomePage;
    product.unit = newProduct.unit;
    product.numberOfUnits = newProduct.numberOfUnits;
    product.state = newProduct.state;
    product.promo = newProduct.promo;
    product.onHomePage = newProduct.onHomePage;
    product.ingredients = newProduct.ingredients;
    product.countryOrigin = newProduct.countryOrigin;
    product.amountBrew = newProduct.amountBrew;
    product.temperatureBrew = newProduct.temperatureBrew;
    product.timeBrew = newProduct.timeBrew;
    product.numberBrews = newProduct.numberBrews;
    product.storageMethod = newProduct.storageMethod;
    product.coffeeSpecies = newProduct.coffeeSpecies;
    product.howToBrew = newProduct.howToBrew;
    product.capacity = newProduct.capacity;
    product.size = newProduct.size;

    await product.save();

    return product;
  }

  async findAll(): Promise<Product[]> {
    return await Product.find();
  }

  async findOne(id: string): Promise<Product> {
    return await Product.findOneOrFail({
      where: {
        id
      }
    });
  }

  async update(id: string, updateProduct: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    product.name = updateProduct.name ?? product.name;
    product.category = updateProduct.category ?? product.category;
    product.type = updateProduct.type ?? product.type;
    product.description = updateProduct.description ?? product.description;
    product.price = updateProduct.price ?? product.price;
    product.image = updateProduct.image ?? product.image;
    product.forGift = updateProduct.forGift ?? product.forGift;
    product.onHomePage = updateProduct.onHomePage ?? product.onHomePage;
    product.unit = updateProduct.unit ?? product.unit;
    product.numberOfUnits = updateProduct.numberOfUnits ?? product.numberOfUnits;
    product.state = updateProduct.state ?? product.state;
    product.promo = updateProduct.promo ?? product.promo;
    product.onHomePage = updateProduct.onHomePage ?? product.onHomePage;
    product.ingredients = updateProduct.ingredients ?? product.ingredients;
    product.countryOrigin = updateProduct.countryOrigin ?? product.countryOrigin;
    product.amountBrew = updateProduct.amountBrew ?? product.amountBrew;
    product.temperatureBrew = updateProduct.temperatureBrew ?? product.temperatureBrew;
    product.timeBrew = updateProduct.timeBrew ?? product.timeBrew;
    product.numberBrews = updateProduct.numberBrews ?? product.numberBrews;
    product.storageMethod = updateProduct.storageMethod ?? product.storageMethod;
    product.coffeeSpecies = updateProduct.coffeeSpecies ?? product.coffeeSpecies;
    product.howToBrew = updateProduct.howToBrew ?? product.howToBrew;
    product.capacity = updateProduct.capacity ?? product.capacity;
    product.size = updateProduct.size ?? product.size;

    await product.save();

    return product;
  }

  async remove(id: string): Promise<{ id: string }> {

    const product = await this.findOne(id);

    await product.remove();

    return { id };
  }
}
