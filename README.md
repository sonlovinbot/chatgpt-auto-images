# ChatGPT Image Automation

Extension Chrome giúp tạo nhiều ảnh bằng ChatGPT theo hàng chờ. Bạn có thể nhập nhiều prompt, thêm ảnh tham chiếu theo từng prompt, theo dõi tiến trình và tự lưu ảnh hoàn thành về máy.

> Extension sử dụng tab ChatGPT mà bạn đã đăng nhập. Bạn luôn là người bắt đầu tác vụ; extension không vượt qua đăng nhập, xác minh, giới hạn sử dụng hay các quy tắc an toàn của ChatGPT.

## Chức năng chính

- Tạo ảnh hàng loạt từ danh sách prompt.
- Gắn tối đa năm ảnh tham chiếu cho mỗi prompt và giữ đúng thứ tự ảnh.
- Chạy lần lượt từng tác vụ; hỗ trợ tạm dừng, tiếp tục, thử lại và dừng.
- Theo dõi ảnh mới tạo bởi ChatGPT, tránh lấy nhầm ảnh cũ trong cuộc trò chuyện.
- Tự tải ảnh về máy hoặc tải thủ công từng ảnh.
- Lưu hàng chờ, log và trạng thái để có thể tiếp tục sau khi đóng side panel hoặc reload extension.
- Có thể nhận tác vụ từ ứng dụng cục bộ tương thích, nhưng vẫn dùng cùng một hàng chờ và giao diện như khi tạo thủ công.

## Cài đặt bằng Chrome Developer mode

Dùng cách này khi bạn có mã nguồn extension và muốn chạy hoặc kiểm thử phiên bản đang phát triển.

### 1. Chuẩn bị thư mục extension

Bạn cần có thư mục auto-chatgpt-images chứa file manifest.json ở cấp gốc. Nếu bạn tải source dưới dạng ZIP, hãy giải nén ZIP trước; **không** chọn file ZIP trong Chrome.

Ví dụ, thư mục cần chọn là:

~~~
/Users/danghuuson/OPEN SOURCE VIBE CODE/extensions/auto-chatgpt-images
~~~

### 2. Mở trang quản lý extension

1. Mở Chrome.
2. Nhập địa chỉ sau vào thanh địa chỉ rồi nhấn Enter:

   ~~~
   chrome://extensions
   ~~~

3. Bật công tắc **Developer mode** ở góc trên bên phải.

### 3. Nạp extension

1. Bấm **Load unpacked**.
2. Chọn thư mục auto-chatgpt-images đã chuẩn bị ở bước 1.
3. Chrome sẽ hiện thẻ **ChatGPT Image Automation** trong danh sách extension.
4. Bật công tắc ở góc thẻ nếu extension đang tắt.

Nếu Chrome báo không tải được extension, kiểm tra lại rằng bạn đã chọn đúng thư mục có file manifest.json, không phải thư mục cha hoặc file ZIP.

### 4. Mở extension

1. Mở https://chatgpt.com và đăng nhập tài khoản ChatGPT của bạn.
2. Bấm biểu tượng mảnh ghép **Extensions** trên thanh công cụ Chrome.
3. Chọn **ChatGPT Image Automation**. Bạn có thể bấm biểu tượng ghim để luôn thấy extension trên thanh công cụ.
4. Side panel sẽ mở ở cạnh phải của trang ChatGPT.

Nếu side panel hiển thị nút **Chuyển đến ChatGPT**, hãy bấm nút đó để mở hoặc chuyển sang tab ChatGPT trước khi bắt đầu.

## Cập nhật sau khi sửa code

Mỗi khi mã nguồn thay đổi:

1. Mở lại chrome://extensions.
2. Tìm thẻ **ChatGPT Image Automation**.
3. Bấm nút **Reload** (biểu tượng mũi tên vòng tròn).
4. Quay lại tab ChatGPT và đóng/mở lại side panel.

Nếu bạn thay đổi manifest.json, hãy luôn Reload extension trước khi kiểm tra.

## Tạo ảnh thủ công

1. Mở ChatGPT và side panel extension.
2. Vào tab **Tạo ảnh hàng loạt**.
3. Dán prompt vào ô **Prompt hàng loạt**:
   - Mỗi dòng là một prompt.
   - Nếu một prompt có nhiều dòng, ngăn các prompt bằng một dòng trống.
4. Extension tạo các line ở bên dưới theo đúng thứ tự prompt.
5. Chọn ảnh chính nếu muốn ghép một ảnh cho mỗi line, hoặc dùng nút **+ Ref** để thêm ảnh tham chiếu cho từng line.
6. Chọn tỷ lệ ảnh, tên file và kiểm tra lại prompt.
7. Bấm **Thêm vào hàng chờ** để xem lại trước, hoặc **Thêm và chạy** để bắt đầu.

Mỗi tác vụ chỉ gửi prompt một lần. Nếu một ảnh tham chiếu không tải được, tác vụ sẽ dừng và báo lỗi thay vì bỏ qua ảnh đó.

## Quản lý hàng chờ

Vào tab **Hàng chờ** để:

- xem tác vụ đang chạy, đang chờ, đã hoàn thành hoặc lỗi;
- tạm dừng và tiếp tục toàn bộ hàng chờ;
- dừng tác vụ hiện tại;
- thử lại tác vụ lỗi;
- tải từng ảnh đã hoàn thành.

Tác vụ mới và tác vụ đang chạy được ưu tiên hiển thị phía trên. Tác vụ lỗi, đã hủy hoặc cũ được đưa xuống dưới để hàng chờ dễ theo dõi.

## Lưu ảnh về máy

Trong tab **Cài đặt**, bạn có thể bật tự tải ảnh và đặt thư mục con trong Downloads, ví dụ:

~~~
ChatGPT Image Automation
~~~

Chế độ tự tải là cách đáng tin cậy nhất để lưu vào thư mục đã chọn. Nếu Chrome hiển thị hộp thoại **Save As**, bạn có thể đổi tên hoặc chọn thư mục khác; Chrome có quyền quyết định cuối cùng về vị trí lưu file.

Nếu có extension khác cũng đổi tên file tải về, Chrome có thể báo xung đột tên file. Khi đó, tắt extension xung đột trong lúc chạy hoặc dùng tên file mặc định.

## Log và xử lý lỗi

Vào tab **Nhật ký** để xem log chi tiết của từng lần tạo ảnh. Mỗi phiên có nút **Copy** để sao chép toàn bộ log khi cần gửi hỗ trợ.

| Hiện tượng | Cách xử lý |
| --- | --- |
| Extension không hoạt động ngoài ChatGPT | Mở chatgpt.com, đăng nhập rồi mở lại side panel. |
| Prompt đã nhập nhưng không gửi | Kiểm tra ChatGPT không bị chặn bởi login, xác minh hoặc giới hạn sử dụng. |
| Ảnh tham chiếu không tải được | Chọn lại file ảnh; dùng PNG, JPG hoặc WEBP hợp lệ. |
| Ảnh tạo xong nhưng hàng chờ chưa cập nhật | Chờ vài giây để extension xác nhận ảnh đã tải xong; mở Nhật ký nếu cần kiểm tra. |
| Extension vừa Reload | Mở lại side panel. Hàng chờ sẽ cố gắng khôi phục mà không gửi lại prompt. |
| Lỗi tải file hoặc tên file | Kiểm tra extension khác có can thiệp Downloads; tắt extension xung đột khi kiểm tra. |

## Phát triển và đóng gói

~~~
npm run check
npm test
npm run package
~~~

Gói phát hành được tạo trong thư mục dist/. Quy trình đầy đủ để đưa extension lên Chrome Web Store nằm tại [docs/chrome-web-store-release.md](docs/chrome-web-store-release.md).

## Tài liệu liên quan

- [Product brief](docs/product-brief.md)
- [Privacy Policy](docs/privacy-policy.md)
- [Quy trình phát hành Chrome Web Store](docs/chrome-web-store-release.md)

## Lưu ý an toàn

Extension không cố vượt qua ChatGPT login, CAPTCHA, xác minh tài khoản, giới hạn sử dụng hay các giới hạn an toàn. Khi ChatGPT yêu cầu một thao tác như vậy, hãy thực hiện trực tiếp trên trang ChatGPT rồi tiếp tục hàng chờ.
