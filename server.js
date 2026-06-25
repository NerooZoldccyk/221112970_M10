import express from "express";
import cors from "cors";
 
const app = express();
 
app.use(express.json());
app.use(cors());
 
// Data sementara tanpa database
let barang = [
    {
        id: 1,
        nama: "Laptop",
        merk: "Asus",
        harga: 10000000
    },
    {
        id: 2,
        nama: "Mouse",
        merk: "Logitech",
        harga: 250000
    }
];
 
// Route utama
app.get("/", (req, res) => {
    res.send("Ini rute /");
});
 
// Ambil semua barang
app.get("/barang", (req, res) => {
    res.json(barang);
});
 
// Tambah barang
app.post("/barang", (req, res) => {
 
    const dataBaru = {
        id: barang.length > 0 ? barang[barang.length - 1].id + 1 : 1,
        nama: req.body.nama,
        merk: req.body.merk,
        harga: req.body.harga
    };
 
    barang.push(dataBaru);
 
    res.status(201).json(dataBaru);
});
 
// Update barang
app.put("/barang/:id", (req, res) => {
 
    const id = parseInt(req.params.id);
 
    const item = barang.find(b => b.id === id);
 
    if (!item) {
        return res.status(404).json({
            message: "Data tidak ditemukan"
        });
    }
 
    item.nama = req.body.nama;
    item.merk = req.body.merk;
    item.harga = req.body.harga;
 
    res.json(item);
});
 
// Hapus barang
app.delete("/barang/:id", (req, res) => {
 
    const id = parseInt(req.params.id);
 
    const index = barang.findIndex(b => b.id === id);
 
    if (index === -1) {
        return res.status(404).json({
            message: "Data tidak ditemukan"
        });
    }
 
    barang.splice(index, 1);
 
    res.json({
        message: `Barang dengan id ${id} berhasil dihapus`
    });
});
 
// Jalankan server
const PORT = process.env.PORT || 8090;
 
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});