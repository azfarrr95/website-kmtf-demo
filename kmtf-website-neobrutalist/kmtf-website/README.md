# KMTF ISBI Bandung — Website Neo-Brutalist Edition

## Struktur File
```
kmtf-website/
├── index.html              ← Halaman utama
├── assets/
│   ├── css/
│   │   └── style.css       ← Semua styling
│   ├── js/
│   │   └── main.js         ← Interaksi & animasi
│   ├── images/             ← Semua gambar
│   │   ├── logo-kmtf.png
│   │   ├── poster-singgih.png
│   │   ├── poster-glen.png
│   │   └── [tambah gambar lain di sini]
│   └── fonts/              ← (Opsional) Font lokal
│       └── [taruh file .woff2 Area font di sini]
└── README.md
```

## Cara Mengedit

### 1. Mengganti Font 'Area'
- Tambahkan file `Area-Black.woff2` dan `Area-Bold.woff2` ke folder `assets/fonts/`
- Uncomment blok `@font-face` di bagian atas `style.css`
- Ubah `--font-display` dari `'Bebas Neue'` menjadi `'Area', 'Bebas Neue', sans-serif`

### 2. Mengganti Gambar Portfolio
Di `index.html`, cari `.port-item` dan ubah atribut `style`:
```html
<div class="port-item" style="--bg-img:url(assets/images/NAMA-FILE.jpg)">
```

### 3. Mengganti Warna
Di `style.css`, bagian `:root`:
```css
--red:    #c50222;   /* Merah */
--lime:   #c5fe33;   /* Lime / Hijau */
--orange: #ee6400;   /* Oranye */
```

### 4. Menambah Karya Portfolio
Duplikat blok `.port-item` di section `#karya` di `index.html`.
Ganti judul, kategori, tahun, dan gambar.

### 5. Menambah Kegiatan
Duplikat blok `.kegiatan-item` di section `#kegiatan`.

### 6. Link Sosial Media
Cari komentar `<!-- Ganti # dengan link Instagram, YouTube, dll -->` 
di `index.html` bagian footer dan ganti `href="#"`.

## Panduan Design System

### Palet Warna
| Variabel      | Hex       | Penggunaan                         |
|---------------|-----------|------------------------------------|
| `--red`       | `#c50222` | Ticker header, kartu aksen         |
| `--lime`      | `#c5fe33` | CTA utama, highlight aktif, aksen  |
| `--orange`    | `#ee6400` | Label section, tags, ikon          |
| `--black`     | `#0a0a0a` | Background utama                   |

### Tipografi
- **Display/Judul besar**: Bebas Neue (→ ganti Area jika tersedia)
- **Body**: Barlow (300, 400, 600)
- **Condensed/Label/Nav**: Barlow Condensed (700, 900)
- **Aksen script**: Georgia italic (→ ganti Edwardian Script jika tersedia)

### Elemen Desain
- **Halftone**: `background-image: radial-gradient(circle, [warna] 1px, transparent 1px)` + `background-size: 20px 20px`
- **Noise texture**: `.noise-overlay` fixed di atas semua elemen
- **Spectral gradient**: `.spectral-blob` dengan `filter: blur(80px)`
- **Brutalist border**: `border: 2px solid var(--border)` + `box-shadow: 4px 4px 0 var(--lime)` pada hover

## Referensi Inspirasi
- sewonscreening.com
- jaff-filmfest.org
