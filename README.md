# Aeternum - Sertifikat Digital Aman dan Terjamin dengan AI dan Teknologi Blockchain

## Deskripsi
Aeternum adalah aplikasi yang dirancang untuk menyimpan sertifikat digital secara aman dan terbukti keasliannya. Aplikasi ini memanfaatkan teknologi blockchain untuk melakukan penyimpanan data kredensial dan AI untuk verifikasi dan mengindentifikasi valid atau tidaknya suatu sertifikat yang disimpan.

## Prerequisites
Sebelum memulai, pastikan Anda memiliki perangkat lunak berikut diinstal di sistem Anda:

- [Node.js](https://nodejs.org/) (versi 20)
- [Yarn](https://yarnpkg.com/) (versi terbaru)
- [WSL (Windows Subsystem for Linux) https://learn.microsoft.com/en-us/windows/wsl/install]
- [IC SDK https://internetcomputer.org/docs/current/developer-docs/getting-started/quickstart/first-smart-contract]

## Instalasi dan Running Aplication

1. **Jalankan WSL pada windows**
2. **Clone repositori**
   ```bash
   git clone https://github.com/AeternumTeam/aeternum-icp-new.git aeternum-icp
   cd aeternum-icp
   cd frontend
   ```
3. **Install depecencies**
   ```bash
   yarn install
   ```
4. **Jalankan Aplikasi**
   ```bash
   dfx start --clean
   ```
   Lalu, silahkan buka terminal wsl baru lagi atau tambah tab baru
   ```bash
   yarn build
   dfx deploy frontend
   ```
