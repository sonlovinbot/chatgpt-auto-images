# Quy trình phát hành Chrome Web Store

Tài liệu này là checklist để đóng gói, tạo Draft, gửi duyệt và cập nhật
**ChatGPT Image Automation** trên Chrome Web Store.

## Nguyên tắc

- **Draft** chưa được duyệt và chưa công khai.
- Chỉ bấm **Submit for review** sau khi đã kiểm tra package, listing và Privacy.
- Homepage URL và Support URL là tùy chọn; không dùng URL localhost, URL riêng tư
  hoặc URL chưa tồn tại.
- Privacy Policy URL là bắt buộc khi extension xử lý dữ liệu người dùng. URL phải
  công khai và mở được khi không đăng nhập.
- Chrome Web Store có thể chặn tự động hoá trong Developer Dashboard. Khi đó,
  thực hiện các bước còn lại trực tiếp trong trình duyệt.

## 1. Chuẩn bị package

Trước mỗi release:

- [ ] Kiểm tra tên và mô tả ngắn trong `manifest.json`.
- [ ] Tăng `version` trong `manifest.json`. Store không nhận version trùng hoặc thấp hơn.
- [ ] Kiểm tra icon 16, 32, 48, 128 px trong `assets/icons/`.
- [ ] Không để token, API key, file `.env`, log riêng tư, asset thử nghiệm hoặc package cũ trong ZIP.
- [ ] Chạy kiểm tra và đóng gói.

```bash
npm run check
npm test
npm run package
```

Gói phát hành nằm tại:

```text
dist/chatgpt-image-automation-<version>.zip
```

Mở ZIP một lần để xác nhận `manifest.json` nằm ngay ở cấp gốc.

## 2. Store Listing

### Bắt buộc

| Hạng mục | Yêu cầu |
| --- | --- |
| Store icon | PNG 128 × 128 px |
| Screenshot | Ít nhất 1 ảnh; 1280 × 800 hoặc 640 × 400 px; JPEG hoặc PNG 24-bit không alpha |
| Description | Viết lợi ích và cách dùng cho người dùng cuối |
| Category | `Art & Design` |
| Language | `Vietnamese` |

Không dùng screenshot có prompt bí mật, token, dữ liệu khách hàng hoặc màn hình
lỗi. Nên cho thấy side panel, prompt hàng loạt, ảnh tham chiếu hoặc hàng chờ.

### Tùy chọn

- Homepage URL
- Support URL
- Video giới thiệu
- Small promo tile: 440 × 280 px
- Marquee promo tile: 1400 × 560 px

Để trống các trường tùy chọn nếu chưa có trang công khai phù hợp. Không tạo link
giả chỉ để hoàn tất form.

### Nội dung đề xuất

**Summary**

> Create, organize, and save ChatGPT images with prompts and reference images.

**Description**

> ChatGPT Image Automation giúp bạn tạo nhiều ảnh với ChatGPT theo cách gọn
> gàng và dễ theo dõi.
>
> Chỉ cần nhập các prompt bạn muốn tạo ảnh. Bạn có thể thêm ảnh tham khảo cho
> từng ý tưởng, sắp xếp chúng theo thứ tự và đặt tên file trước khi bắt đầu.
>
> Trong lúc tạo ảnh, bạn luôn biết việc nào đang chạy, việc nào đã hoàn thành
> và việc nào cần thử lại. Bạn có thể tạm dừng, tiếp tục hoặc dừng hàng chờ bất
> cứ lúc nào.
>
> Khi ảnh hoàn tất, extension tự lưu ảnh về máy để bạn sử dụng ngay.
>
> Bạn cần đăng nhập ChatGPT trong trình duyệt. Extension chỉ thực hiện thao tác
> khi bạn bấm bắt đầu; không can thiệp vào đăng nhập, các bước xác minh hoặc
> giới hạn sử dụng của ChatGPT.

## 3. Privacy Policy công khai

Policy nguồn nằm tại `docs/privacy-policy.md`. Trước khi gửi duyệt, phải có bản
**công khai**. Cách nhanh cho giai đoạn đầu là GitHub Gist:

```bash
gh gist create --public docs/privacy-policy.md \
  -d 'ChatGPT Image Automation Privacy Policy'
```

Mở URL Gist ở cửa sổ ẩn danh để chắc chắn công khai. Policy phải phản ánh đúng
hành vi đang có, gồm:

- prompt, ảnh tham chiếu, ảnh kết quả và thông tin hàng chờ được xử lý để thực
  hiện yêu cầu tạo ảnh;
- dữ liệu chỉ gửi tới ChatGPT khi người dùng bắt đầu tác vụ;
- hàng chờ/cài đặt được lưu cục bộ để tiếp tục sau reload;
- không bán dữ liệu, không quảng cáo và không profiling;
- cách liên hệ publisher.

Khi policy thay đổi, cập nhật cả file trong repository và bản công khai. Không
viết policy mâu thuẫn với hành vi thực tế của extension.

## 4. Privacy tab cho đội duyệt

Vào **Build → Privacy**. Viết ngắn gọn, chính xác và thiên về lý do kỹ thuật.
Phần này khác Store Listing dành cho người dùng.

### Single purpose

```text
Help users run image-generation prompts and optional reference images
sequentially in their signed-in ChatGPT tab, then save each completed image
locally.
```

### Permission justifications

| Permission | Lý do cần khai báo |
| --- | --- |
| `alarms` | Khôi phục hàng chờ người dùng đã khởi tạo khi service worker bị dừng hoặc side panel reload. |
| `downloads` | Lưu ảnh hoàn thành vào Downloads với tên và thư mục người dùng đã chọn. |
| `scripting` | Chạy code đóng gói trên `chatgpt.com` sau hành động của người dùng để nhập prompt, upload ảnh và nhận ảnh mới. |
| `sidePanel` | Giao diện tạo tác vụ, theo dõi hàng chờ, log, pause/resume/retry/stop. |
| `storage` | Lưu cục bộ cài đặt, hàng chờ và thông tin khôi phục. |
| `tabs` | Tìm/focus tab ChatGPT hiện có hoặc mở cuộc trò chuyện mới khi người dùng bắt đầu chạy. |
| Host permissions | Chỉ truy cập `chatgpt.com` cho luồng tạo ảnh do người dùng khởi động; localhost chỉ phục vụ phát triển/kiểm thử cục bộ. |

Chọn **No, I am not using Remote code** chỉ khi tất cả JavaScript/Wasm thực thi
đã ở trong ZIP extension và không dùng `eval`, script/module từ URL bên ngoài
hoặc code tải động.

### Data usage

Khai báo dữ liệu đúng thực tế. Với luồng hiện tại, chọn **Website content** vì
extension xử lý prompt và ảnh trong phiên ChatGPT do người dùng bắt đầu. Không
chọn các nhóm dữ liệu khác nếu extension không thu thập chúng.

Chỉ tích ba chứng nhận Limited Use nếu tất cả đều đúng: không bán/chuyển dữ liệu
ngoài trường hợp được phép; không dùng cho mục đích ngoài extension; không dùng
để đánh giá tín dụng hoặc cho vay.

Dán Privacy Policy URL công khai vào **Privacy policy URL** và bấm **Save draft**.

## 5. Tạo và lưu Draft

1. Vào [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/).
2. Chọn **New item** và tải ZIP từ `dist/`.
3. Trong **Build → Store listing**, tải icon, screenshot và điền trường bắt buộc.
4. Trong **Build → Privacy**, hoàn thành khai báo và Privacy Policy URL.
5. Bấm **Save draft** sau mỗi phần lớn.
6. Bấm **Why can’t I submit?** và xử lý toàn bộ mục được liệt kê.

## 6. Phân phối và gửi duyệt

- **Draft**: chưa gửi duyệt, chưa công khai.
- **Unlisted**: chỉ người có link Store mới cài được, không xuất hiện trong tìm kiếm.
- **Public**: có thể xuất hiện trong tìm kiếm sau khi được duyệt.

Nếu chỉ chia sẻ nội bộ sau duyệt, chọn **Unlisted** và tắt phát hành tự động nếu
Dashboard cung cấp tuỳ chọn đó. Trước Submit:

- [ ] Kiểm tra version, icon, screenshot, description và policy link.
- [ ] Kiểm tra extension trong Chrome profile/tài khoản test.
- [ ] Kiểm tra tạo ảnh, nhiều prompt, ảnh tham chiếu, pause/resume, retry,
      download và reload/recovery.
- [ ] Kiểm tra không có error mới ở `chrome://extensions`.
- [ ] Thêm **Access → Test instructions** nếu reviewer cần một bước đặc biệt.

Không gửi duyệt nếu luồng cần CAPTCHA, đăng nhập, quota trả phí hoặc thao tác
đặc biệt mà chưa có Test instructions cho reviewer.

## 7. Cập nhật sau này

1. Tăng version trong `manifest.json`.
2. Chạy `npm run check`, `npm test`, `npm run package`.
3. Vào **Build → Package → Upload new package**.
4. Xác nhận version mới xuất hiện ở Draft.
5. Cập nhật Privacy tab nếu permissions hoặc cách xử lý dữ liệu thay đổi.
6. Cập nhật screenshot/listing/policy nếu trải nghiệm đã thay đổi đáng kể.
7. Lưu Draft rồi gửi bản update duyệt khi sẵn sàng.

## 8. Lỗi thường gặp

| Triệu chứng | Nguyên nhân | Cách xử lý |
| --- | --- | --- |
| `You must provide a link to your privacy policy` | Đã khai báo xử lý dữ liệu nhưng thiếu URL policy công khai | Tạo/kiểm tra URL công khai, dán vào Privacy tab, Save draft. |
| `Why can’t I submit?` báo permission | Permission trong manifest thiếu justification | Điền lý do đúng hoặc bỏ permission không cần rồi đóng gói version mới. |
| Package bị từ chối | Version trùng hoặc ZIP sai cấu trúc | Tăng version; đảm bảo `manifest.json` ở ZIP root. |
| Screenshot không nhận | Sai kích thước/định dạng hoặc PNG có alpha | Xuất lại JPEG 1280 × 800 hoặc 640 × 400. |
| Tên file download conflict | Extension khác cũng đặt lại filename qua Chrome downloads API | Tắt extension xung đột khi kiểm tra, hoặc dùng tên mặc định. |
| Dashboard không thao tác được qua automation | Chrome Web Store giới hạn automation | Thực hiện thủ công trong Dashboard và lưu Draft giữa các bước. |

## Checklist cuối

- [ ] Version mới và ZIP đúng.
- [ ] `npm run check` và `npm test` thành công.
- [ ] Icon và screenshot hiển thị đúng.
- [ ] Description dễ hiểu, không hứa tính năng chưa phát hành.
- [ ] Privacy Policy URL mở công khai.
- [ ] Permissions, remote code và data usage khớp code thực tế.
- [ ] Không còn mục trong **Why can’t I submit?**.
- [ ] Đã chọn Draft/Unlisted/Public đúng ý định.
- [ ] Đã kiểm tra extension trước khi gửi duyệt.
