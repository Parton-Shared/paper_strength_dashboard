# paper_strength_dashboard

export NODE_OPTIONS=--openssl-legacy-provider

### Container kullanımı

Yukarıdaki kuruluma alternatif olarak proje direkt production kullanımı için container formunda da build edilebilir.

#### Build

Dockerfile ----build----> Image ----run----> Container

Yukarıdaki şemadan görülebileceği üzere Dockerfile build edilerek Image elde edilir. Bu projeyi build edip (-t argümanı ile tanımlanan) "mk-dashboard-image" adlı image elde etmek için:

```bash
docker buildx build . -t mk-dashboard-image
```

komutu çalıştırılır.

Build sırasında nginx için vue.js projesini build eden build environment'ı içeren ara image'ı (ve diğer dangling imageları) bilgisayardan silmek için (sıkça test yapılan bilgisayarlarda tavsiye edilmez):

```bash
docker system prune
```

komutu çalıştırılır.

#### Run

Build aşamasından çıkan image'ı çalıştırarak container haline getirmek için:

```bash
docker run -p 8080:80 mk-dashboard-image
```

komutu kullanılır ve (-p argümanı ile) host bilgisayarın 8080 portu container'ın 80 portuna bağlanmış olur.

Dashboard erişimi için host bilgisayardaki tarayıcıda aşağıdaki adrese giriş yapılır.

[http://localhost:8080/](http://localhost:8080/)