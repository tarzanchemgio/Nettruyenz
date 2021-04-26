"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("faker");
const MangaModel_1 = require("../models/MangaModel");
const MangaRateModel_1 = require("../models/MangaRateModel");
const UserModel_1 = require("../models/UserModel");
const CreateBookmark_1 = require("./CreateBookmark");
async function createMangaRating() {
    let users = (await UserModel_1.userModel.find({}).lean().exec()).map((v, i) => {
        return v;
    });
    let mangas = (await MangaModel_1.mangaModel.find({}).lean().exec()).map((v, i) => {
        return v;
    });
    users.forEach(async (user, index) => {
        let mangaNum = faker_1.random.number(mangas.length);
        mangas = CreateBookmark_1.shuffle(mangas);
        let mangaRates = [];
        for (let i = 0; i < mangaNum; i++) {
            let mangaRate = {
                manga: mangas[i].id,
                rate: faker_1.random.number(5),
                email: user.email,
                isDeleted: false,
            };
            mangaRates.push(mangaRate);
        }
        await MangaRateModel_1.mangaRateModel.insertMany(mangaRates);
        console.log(`${user.nickname} has rated ${mangaRates.length} mangas`);
    });
}
createMangaRating().then(() => {
    console.log(`Done!!`);
});