# Thiệp Cưới Thanh An & Thuy Vi

Một trang web thiệp cưới đẹp mắt, responsive được xây dựng với React, Redux Toolkit và SCSS Modules.

## 🚀 Tính năng

- **Thiết kế pixel-perfect** khớp với thiệp cưới gốc
- **Layout responsive** tối ưu cho mobile, tablet và desktop
- **Đếm ngược thời gian thực** đến ngày cưới
- **Các phần tử tương tác** với animation mượt mà
- **Tech stack hiện đại** với React 19, Redux Toolkit và SCSS Modules
- **Framer Motion** cho animation và transition mượt mà

## 🛠️ Tech Stack

- **React 19** - Latest React with JSX and functional components
- **Redux Toolkit** - State management for UI interactions
- **React Router v6** - Client-side routing
- **SCSS Modules** - Scoped styling for each component
- **Framer Motion** - Animation library
- **Vite** - Fast build tool and development server

## 📦 Cài đặt

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd Thanh_An_Thuy_Vi_Wedding_Invitation
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Khởi chạy development server**
   ```bash
   npm run dev
   ```

4. **Mở trình duyệt**
   Truy cập `http://localhost:5173` để xem ứng dụng.

## 🏗️ Cấu trúc dự án

```
src/
├── assets/           # Hình ảnh, icon, font
├── components/       # Components tái sử dụng
│   ├── Button/      # Component Button với các variants
│   ├── Countdown/   # Component đếm ngược
│   ├── EventSection/ # Component chi tiết sự kiện
│   └── Icons/       # Components icon SVG
├── pages/           # Components trang
│   └── Home/        # Trang thiệp cưới chính
├── store/           # Cấu hình Redux store
│   ├── index.js     # Thiết lập store
│   └── uiSlice.js   # Quản lý state UI
├── styles/          # Styles toàn cục và SCSS utilities
│   ├── _variables.scss  # Biến SCSS
│   ├── _mixins.scss     # Mixins SCSS
│   ├── reset.scss       # CSS reset
│   └── global.scss      # Styles toàn cục
├── App.jsx          # Component app chính
└── main.jsx         # Điểm khởi đầu ứng dụng
```

## 🎨 Tính năng thiết kế

### Bảng màu
- **Nền**: Beige nhạt (`#F8F5F0`)
- **Chữ**: Xám đậm (`#333333`)
- **Nút**: Đen (`#000000`) với chữ trắng
- **Điểm nhấn**: Trắng (`#FFFFFF`)

### Typography
- **Font chính**: Montserrat (Google Fonts)
- **Font chữ viết tay**: Great Vibes (Google Fonts)
- **Font serif**: Playfair Display (Google Fonts)

### Breakpoints responsive
- **Mobile**: < 576px
- **Tablet**: 576px - 768px
- **Desktop**: > 768px

## 🎯 Components

### Component Button
- Nhiều variants: `primary`, `secondary`, `outline`
- Các kích thước khác nhau: `small`, `medium`, `large`
- Hiệu ứng hover và transitions

### Component Countdown
- Đếm ngược thời gian thực đến ngày cưới
- Cập nhật mỗi giây
- Hiển thị số responsive

### Component EventSection
- Hiển thị chi tiết lễ cưới và tiệc
- Icon tùy chỉnh cho từng loại sự kiện
- Nút vị trí tương tác

## 📱 Thiết kế Responsive

Ứng dụng được xây dựng với phương pháp mobile-first và bao gồm:

- **Tối ưu mobile** cho tương tác cảm ứng
- **Layout tablet** với spacing và typography điều chỉnh
- **Trải nghiệm desktop** với container lớn hơn và hình ảnh nâng cao
- **Hệ thống grid linh hoạt** sử dụng CSS Grid và Flexbox

## 🎭 Animations

- **Framer Motion** cho page transitions mượt mà
- **Scroll-triggered animations** cho các section nội dung
- **Hover effects** trên các phần tử tương tác
- **Loading animations** cho UX tốt hơn

## 🔧 Scripts có sẵn

- `npm run dev` - Khởi chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Xem trước production build
- `npm run lint` - Chạy ESLint

## 🌐 Triển khai

Ứng dụng có thể được triển khai lên bất kỳ dịch vụ hosting tĩnh nào:

1. **Build dự án**
   ```bash
   npm run build
   ```

2. **Triển khai thư mục `dist`** lên dịch vụ hosting của bạn

## 📄 Giấy phép

Dự án này được tạo cho thiệp cưới của Thanh An & Thuy Vi.

## 🤝 Đóng góp

Đây là dự án thiệp cưới cá nhân, nhưng gợi ý và cải tiến luôn được chào đón!

---

**Được xây dựng với ❤️ cho ngày đặc biệt của Thanh An & Thuy Vi**
