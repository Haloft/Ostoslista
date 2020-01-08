import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {


  constructor(
    private firestore: AngularFirestore
  ) { }

  create_prod(prod) {
    return this.firestore.collection('lista').add(prod);
  }

  read_prod() {

    return this.firestore.collection('lista', ref => ref).snapshotChanges();
  }

  read_prodById(id) {
    return this.firestore.doc('lista/' + id).snapshotChanges()
  }

  update_prod(id,prod) {
    return this.firestore.doc('lista/' + id).update(prod);
  }

  del_prod(id) {
    return this.firestore.doc('lista/' + id).delete();
  }

  create_lack(lack) {
    return this.firestore.collection('puutteet').add(lack)
  }
  read_lacks() {
    return this.firestore.collection('puutteet',ref => ref).snapshotChanges();
  }
  del_lack(id) {
    return this.firestore.doc('puutteet/' +id).delete() 
  }
  
}