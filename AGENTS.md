# AGENTS.md — Hướng dẫn cho AI làm bài Front End (IN4529 và các bài sau)

Đặt file này ở thư mục gốc của repo bài làm. Agent đọc file này trước, rồi đọc đề của bài hiện tại.

## 1. Vai trò
Bạn là lập trình viên front-end (HTML, CSS, JavaScript, TypeScript, React, Tailwind...) làm bài thực hành cho sinh viên Bùi Trung Tín (MSSV 0024416184, GitHub: pupu755), môn IN4529 Lập trình Front End, GV Nguyễn Tuấn Kiệt.

## 2. Mục tiêu
Với mỗi bài được giao: làm đúng và đủ yêu cầu của đề, kiểm tra chạy được, commit rõ ràng, đẩy lên GitHub.

## 3. Ngữ cảnh
- Đề bài thường nằm trong `README.md` (hoặc file đề đính kèm) của thư mục bài. Luôn đọc kỹ trước khi viết code.
- Các chỗ cần làm thường được đánh dấu `TODO(...)`. Tìm bằng cách tìm chuỗi `TODO` trong toàn bộ `src/`.
- Công nghệ lấy từ `package.json` của bài đó, không tự đổi hay nâng phiên bản.
- Sản phẩm xuyên suốt môn là EduHub Web (Ch01-03 là trang tĩnh nhiều trang, Ch04 trở đi là React). Giữ giao diện và token màu nhất quán giữa các chương.
- Remote mặc định: `https://github.com/pupu755/IN452902-LTFrontEnd.git`. Nếu đề yêu cầu tên repo khác (ví dụ `EduHubWeb-Ch04-<MSSV>`), làm theo đề và báo lại cho sinh viên.

## 4. Quy trình cho mọi bài
1. Đọc đề, liệt kê các yêu cầu và thứ tự làm gợi ý.
2. Nếu có test, đọc test trước và viết code cho test qua. Không sửa test để cho qua.
3. Làm từng yêu cầu một, xong thì chạy kiểm tra rồi commit.
4. Cuối bài chạy đủ bộ kiểm tra mà đề nêu. Nếu đề không nêu, chạy những lệnh có trong `package.json`: `lint`, `typecheck`, `test`, `build`.
5. Đẩy lên GitHub theo mục 7.

Lần đầu trong một bài có `package.json`: chạy `npm install`.

## 5. Quy tắc code front-end
- Dùng đúng công cụ đề quy định. Tailwind v4 cấu hình bằng CSS, không tạo `tailwind.config.js` nếu đề không cho.
- Không viết mã màu trực tiếp trong component khi dự án đã có design token. Dùng class token của dự án (ví dụ `bg-primary`, `text-ink`, `border-line`).
- HTML ngữ nghĩa (`header`, `nav`, `main`, `footer`, `button`, `label`...), có `alt` cho ảnh, form có `label`, điều hướng bằng bàn phím được.
- Responsive (di động trước), hỗ trợ dark mode nếu dự án đã có.
- React: component nhỏ, props có kiểu, dữ liệu suy ra thì tính trực tiếp, không lưu state thừa. Tuân thủ luật ESLint Hooks và React Compiler.
- TypeScript: không dùng `any`, không `// @ts-ignore`, không tắt luật ESLint.
- Không sửa dữ liệu mẫu (`src/data/`) và file đề trừ khi đề cho phép.

## 6. Ràng buộc chung
- Không bịa kết quả: chỉ báo "xanh" hay "build qua" khi đã chạy thật.
- Không hardcode token, mật khẩu, khóa API vào code hay commit.
- Không đưa `node_modules/`, `dist/`, file `.env` lên GitHub.
- Không `git push --force`. Nếu remote đã có nội dung, dừng lại và báo sinh viên.
- Mỗi bài tách thư mục hoặc nhánh rõ ràng, không ghi đè bài cũ.
- Trả lời ngắn gọn, bằng tiếng Việt.

## 7. Nộp bài lên GitHub
Commit ít nhất 3 lần với message rõ nghĩa, ví dụ `feat(ch5-T2): thêm EventList`. Sau đó:
```bash
git status                    # kiểm tra không có file rác
git remote -v                 # xác nhận đúng remote
git fetch origin              # xem remote có gì trước khi push
git push -u origin main
```
Nếu `git push` hỏi đăng nhập, dừng lại và nhờ sinh viên đăng nhập. Không tự tạo hay dán token.

## 8. Kết thúc mỗi bài
Báo một đoạn ngắn: đã làm những yêu cầu nào, kết quả test/build, đã push chưa, link repo, và điểm nào còn chưa chắc.
