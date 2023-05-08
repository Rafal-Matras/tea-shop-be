import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';
import {ProductInterface, } from '../types';

@Injectable()
export class ProductService {

  async create(newProduct: CreateProductDto): Promise<ProductInterface> {
    const {
      name,
      category,
      type,
      description,
      price,
      image,
      forGift,
      onHomePage,
      unit,
      numberOfUnits,
      state,
      promo,
      ingredients,
      countryOrigin,
      amountBrew,
      temperatureBrew,
      timeBrew,
      numberBrews,
      storageMethod,
      coffeeSpecies,
      howToBrew,
      capacity,
      size
    } = newProduct;

    const product = new Product();

    product.name = name;
    product.category = category;
    product.type = type;
    product.description = description;
    product.price = price;
    product.image = image;
    product.forGift = forGift;
    product.onHomePage = onHomePage;
    product.unit = unit;
    product.numberOfUnits = numberOfUnits;
    product.state = state;
    product.promo = promo;
    product.ingredients = ingredients;
    product.countryOrigin = countryOrigin;
    product.amountBrew = amountBrew;
    product.temperatureBrew = temperatureBrew;
    product.timeBrew = timeBrew;
    product.numberBrews = numberBrews;
    product.storageMethod = storageMethod;
    product.coffeeSpecies = coffeeSpecies;
    product.howToBrew = howToBrew;
    product.capacity = capacity;
    product.size = size;

    await product.save();

    return product;

  }

  async findAll(): Promise<ProductInterface[]> {
    return await Product.find();

  }

  async findOne(id: string): Promise<ProductInterface> {
    return await Product.findOne({
      where: {
        id
      }
    });

  }

  async update(id: string, updateProduct: UpdateProductDto): Promise<ProductInterface> {
    const {
      name,
      category,
      type,
      description,
      price,
      image,
      forGift,
      onHomePage,
      unit,
      numberOfUnits,
      state,
      promo,
      ingredients,
      countryOrigin,
      amountBrew,
      temperatureBrew,
      timeBrew,
      numberBrews,
      storageMethod,
      coffeeSpecies,
      howToBrew,
      capacity,
      size
    } = updateProduct;

    const product = await Product.findOne({
      where: {
        id
      }
    });

    product.name = name ?? product.name;
    product.category = category ?? product.category;
    product.type = type ?? product.type;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.image = image ?? product.image;
    product.forGift = forGift ?? product.forGift;
    product.onHomePage = onHomePage ?? product.onHomePage;
    product.unit = unit ?? product.unit;
    product.numberOfUnits = numberOfUnits ?? product.numberOfUnits;
    product.state = state ?? product.state;
    product.promo = promo ?? product.promo;
    product.onHomePage = onHomePage ?? product.onHomePage;
    product.ingredients = ingredients ?? product.ingredients;
    product.countryOrigin = countryOrigin ?? product.countryOrigin;
    product.amountBrew = amountBrew ?? product.amountBrew;
    product.temperatureBrew = temperatureBrew ?? product.temperatureBrew;
    product.timeBrew = timeBrew ?? product.timeBrew;
    product.numberBrews = numberBrews ?? product.numberBrews;
    product.storageMethod = storageMethod ?? product.storageMethod;
    product.coffeeSpecies = coffeeSpecies ?? product.coffeeSpecies;
    product.howToBrew = howToBrew ?? product.howToBrew;
    product.capacity = capacity ?? product.capacity;
    product.size = size ?? product.size;

    await product.save();

    return product;
  }

  async remove(id: string): Promise<string> {
    const product = await Product.findOne({
      where: {
        id
      }
    });

    await product.remove();

    return id
  }
}
