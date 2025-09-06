# Hướng dẫn cấu hình Supabase cho Wedding Invitation

## 1. Tạo project Supabase

1. Truy cập [https://supabase.com](https://supabase.com)
2. Đăng ký/đăng nhập tài khoản
3. Tạo project mới
4. Chọn region gần nhất (Singapore cho Việt Nam)

## 2. Tạo Storage Bucket

1. Vào **Storage** trong dashboard Supabase
2. Tạo bucket mới với tên: `signatures`
3. Cấu hình bucket:
   - **Public**: ✅ (để có thể truy cập URL công khai)
   - **File size limit**: 5MB
   - **Allowed MIME types**: `image/png, image/jpeg, image/jpg`

## 3. Cấu hình RLS (Row Level Security)

1. Vào **Storage** > **Policies**
2. Tạo policy cho bucket `signatures`:

```sql
-- Policy cho việc upload
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'signatures');

-- Policy cho việc đọc
CREATE POLICY "Allow public reads" ON storage.objects
FOR SELECT USING (bucket_id = 'signatures');
```

## 4. Lấy thông tin cấu hình

1. Vào **Settings** > **API**
2. Copy:
   - **Project URL**
   - **anon public key**

## 5. Cập nhật file cấu hình

### Cách 1: Sử dụng Environment Variables (Khuyến nghị)

1. Tạo file `.env` trong thư mục root của project:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

2. Thay thế các giá trị:
   - `your_supabase_project_url_here` → Project URL từ Supabase
   - `your_supabase_anon_key_here` → anon public key từ Supabase

### Cách 2: Cập nhật trực tiếp trong code

Mở file `src/config/supabase.js` và thay thế:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL' // Thay bằng Project URL
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY' // Thay bằng anon public key
```

## 6. Test cấu hình

1. Chạy project: `npm run dev`
2. Vào phần GuestBook
3. Vẽ chữ ký và gửi lời chúc
4. Kiểm tra trong Supabase Storage xem file đã được upload chưa

## 7. Troubleshooting

### Lỗi upload failed:
- Kiểm tra RLS policies
- Kiểm tra bucket permissions
- Kiểm tra file size (phải < 5MB)

### Lỗi CORS:
- Vào **Settings** > **API** > **CORS**
- Thêm domain của bạn vào allowed origins

### Lỗi authentication:
- Kiểm tra anon key có đúng không
- Kiểm tra project URL có đúng không

## 8. Cấu trúc file trong Storage

```
signatures/
├── signature_1703123456789_John_Doe.png
├── signature_1703123456790_Jane_Smith.png
└── ...
```

Mỗi file chữ ký sẽ có format: `signature_{timestamp}_{name}.png`
