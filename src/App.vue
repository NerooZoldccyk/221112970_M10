<template>
 <div class="container">
 
 <h2 id="judul">List Barang Gudang</h2>
 
 <!-- NIM -->
 <div class="form-tambah">
 <input v-model="nim" type="text" placeholder="NIM" />
 <button @click="simpanNim"
 style="background-color: greenyellow;color: black;">
 Simpan
 </button>
 </div>
 
 <!-- DISKON -->
 <div class="form-tambah">
 <input
 v-model.number="diskon"
 type="number"
 placeholder="Diskon %"
 />
 
 <button
 style="background-color: greenyellow;color: black;">
 Terapkan
 </button>
 </div>
 
 <!-- FORM TAMBAH -->
 <div class="form-tambah">
 <h3>Tambah Barang</h3>
 
 <input
 v-model="newProduk.nama"
 type="text"
 placeholder="Nama"
 />
 
 <input
 v-model="newProduk.merk"
 type="text"
 placeholder="Merk"
 />
 
 <input
 v-model.number="newProduk.harga"
 type="number"
 placeholder="Harga"
 />
 
 <button @click="tambahProduk">Tambah</button>
 </div>
 
 <button @click="loadData">Reload Data</button>
 
 <!-- LIST DATA -->
 <ul v-if="produkList.length > 0">
 
 <li
 v-for="(produk, index) in produkList"
 :key="produk.id"
 class="item"
 >
 
 <!-- NAMA -->
 <input v-model="produk.nama" type="text" />
 
 <!-- MERK -->
 <input v-model="produk.merk" type="text" />
 
 <!-- HARGA SETELAH DISKON -->
 <input
 :value="hitungDiskon(produk.harga)"
 type="number"
 readonly
 />
 
 <!-- HAPUS -->
 <button @click="hapusProduk(produk.id, index)">
 Hapus
 </button>
 
 <!-- SIMPAN -->
 <button
 @click="simpanProduk(produk)"
 style="background-color: greenyellow;color: black;"
 >
 Simpan
 </button>
 
 </li>
 </ul>
 
 <p v-else>Loading / Tidak ada data...</p>
 
 </div>
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
 
const produkList = ref([])
 
const nim = ref("")
 
const diskon = ref(0)
 
const newProduk = ref({
 nama: '',
 merk: '',
 harga: null
})
 
function simpanNim(){
 
 let judul = document.getElementById("judul")
 
 judul.innerHTML =
 "List Barang Gudang " + nim.value
}
 
/* HITUNG DISKON */
function hitungDiskon(harga){
 
 return harga + (harga * diskon.value / 100)
}
 
/* LOAD DATA */
async function loadData() {
 
 try {
 
 const response =
 await fetch('http://localhost:8090/barang')
 
 const data = await response.json()
 
 produkList.value = data.map(item => ({
 ...item,
 saved: false
 }))
 
 } catch (error) {
 
 console.error('Gagal ambil data:', error)
 }
}
 
/* TAMBAH PRODUK */
async function tambahProduk() {
 
 if (!newProduk.value.nama || !newProduk.value.merk) {
 
 alert('Nama & Merk wajib diisi!')
 
 return
 }
 
 try {
 
 await fetch('http://localhost:8090/barang', {
 
 method: 'POST',
 
 headers: {
 'Content-Type': 'application/json'
 },
 
 body: JSON.stringify(newProduk.value)
 })
 
 alert('✅ Berhasil tambah data')
 
 newProduk.value = {
 nama: '',
 merk: '',
 harga: null
 }
 
 loadData()
 
 } catch (error) {
 
 console.error('Gagal tambah:', error)
 }
}
 
/* HAPUS */
async function hapusProduk(id, index) {
 
 try {
 
 await fetch(`http://localhost:8090/barang/${id}`, {
 
 method: 'DELETE'
 })
 
 produkList.value.splice(index, 1)
 
 alert("Berhasil Hapus")
 
 } catch (error) {
 
 console.error('Gagal hapus:', error)
 }
}
 
/* UPDATE */
async function simpanProduk(produk) {
 
 try {
 
 await fetch(`http://localhost:8090/barang/${produk.id}`, {
 
 method: 'PUT',
 
 headers: {
 'Content-Type': 'application/json'
 },
 
 body: JSON.stringify(produk)
 })
 
 alert(`✅ Berhasil ubah : ${produk.nama} ${produk.merk}`)
 
 loadData()
 
 } catch (error) {
 
 console.error('Gagal simpan:', error)
 }
}
 
/* LOAD AWAL */
onMounted(() => {
 
 loadData()
})
</script>
 
<style>
 
.container {
 
 max-width: 800px;
 
 margin: auto;
 
 padding: 10px;
 
 font-family: Arial;
}
 
/* ITEM LIST */
.item {
 
 display: flex;
 
 flex-wrap: wrap;
 
 gap: 8px;
 
 margin-bottom: 12px;
 
 align-items: center;
 
 border-bottom: 1px solid #ddd;
 
 padding-bottom: 10px;
}
 
/* FORM */
.form-tambah {
 
 margin-bottom: 20px;
 
 display: flex;
 
 flex-wrap: wrap;
 
 gap: 8px;
}
 
/* INPUT */
input {
 
 padding: 6px;
 
 flex: 1 1 150px;
 
 min-width: 120px;
}
 
/* BUTTON */
button {
 
 background: red;
 
 color: white;
 
 border: none;
 
 padding: 6px 10px;
 
 cursor: pointer;
}
 
button:hover {
 
 opacity: 0.8;
}
 
/* MOBILE */
@media (max-width: 600px) {
 
 .item {
 
 flex-direction: column;
 
 align-items: stretch;
 }
 
 .form-tambah {
 
 flex-direction: column;
 }
 
 button {
 
 width: 100%;
 }
}
 
</style>
 