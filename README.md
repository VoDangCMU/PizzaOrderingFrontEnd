<h1 style="text-align:center"> Pizza Order - Frontend
 </h1>

***
## Cài đặt mã nguồn
### Clone mã nguồn dự án:
   ``` bash
    git clone https://github.com/VoDangCMU/PizzaOrderingFrontEnd.git
    cd PizzaOrderingFrontEnd
   ```

***
### Cài đặt các thư viện cần thiết:
  ``` bash
    yarn install
  ``` 
* hoặc
  ``` bash
    npm install
   ```
***
### Cấu hình bến môi trường:
* Tạo file .env như mẫu trong thư mục gốc của dự án:
```dotenv
 NEXT_PUBLIC_DATA_API=your-api-domain (mặc định là http://localhost:8088)
```

***
### Chạy ở chế độ dev mode:
   ``` bash 
    yarn dev
   ```
* hoặc
   ``` bash 
   npm run dev
   ```
 ***

### Chạy ở chế độ build :
   ``` bash
    yarn build
   ```
* hoặc
   ``` bash
  npm run build
   ```

***

### Chạy ở chế độ start :
   ``` bash
    yarn start
   ```
* hoặc
   ``` bash
    npm run start
   ```
  <li>Truy cập tại: <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></li>

***
## Nâng cao - Triển khai với Vercel và reverse proxy với nginx

### Vercel
* Sau khi đã tạo repository để lưu code trên github, ta truy cập trang dashboard Vercel để tạo 1 dự án mới

 <img src="https://i.imgur.com/7iCt7r1.png">

***

* Cấu hình các biến môi trường

  <img src="https://i.imgur.com/XgmBj4n.png">

***

* Sau khi cấu hình xong thì bấm Deploy
  <img src="https://i.imgur.com/libtr1x.png">

***

### Vậy là đã xong bước deploy trên vercel, bây giờ chúng ta có thể tiến hành reverse proxy với tên miền cá nhân
* Tạo 1 record cho subdomain trên các DNS như Cloudflare
* Giả sử mình có subdomain `todolist.quocbao.com` và địa chỉ máy chủ là `12.234.123.123`
  <img src="https://i.imgur.com/fzOc3JA.png">

***

### Thêm `custom.conf` vào nginx trong `/etc/nginx/conf.d/`như sau
 ``` text
   server {
    server_name www.quocbao.com; //thay bằng tên miền gốc
    return 301 https://quocbao.com$request_uri;
    }

    server {
    listen 80;
    server_name todolist.quocbao.com; // thay bằng tên miền phụ

    location / {
            proxy_pass https://example.vercel.app; // url của ứng dụng vừa tạo trên vercel
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
 ```
* Reload lại dịch vụ `nginx`
 ``` shell
  nginx -s reload
 ```
### Sau khi reload thành công, bạn có truy cập ứng dụng bằng tên miền phụ của bạn thay vì vercel !!!


***

