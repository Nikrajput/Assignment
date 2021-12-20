//this is going to store Firebase realtime database API code
import { db } from "./firebase";
import { ref, update } from "firebase/database";


//create an user and store it at users/id path (it's an asynchronous func)

export const doCreateUser = (id, username, email) =>{
  update(ref(db, `users/${id}`), { username, email });
}

export const doCreateUserItemOnSale = (id, itemOnSale) =>{
  update(ref(db, `users/${id}`), {itemOnSale});
}

export const doCreateUserItemPurchased = (id, itemPurchased) =>{
  update(ref(db, `users/${id}`), {itemPurchased});
}

export const doCreateCommodity = (id, name, category, price, imagePath, userId) =>{
  update(ref(db, `commodity/${id}`), { name, category, price, imagePath, userId, isPurchased:false });
}

export const dodeleteCommodity = (id) =>{
  update(ref(db, `commodity/${id}`), {isPurchased:true});
}


