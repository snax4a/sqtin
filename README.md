# Service Quotes 
>*Szymon Sus s16785*

### Instrukcja instalacji i uruchomienia
###### Wymagania:
- docker
- docker compose
- wolne porty 3000, 3001, 3306 (można zmienić w docker-compose.yml)
###### Instalacja:

`git clone https://github.com/snax4a/service-quotes.git`

`cd service-quotes`

`docker-compose up -d --build`

Po zbudowaniu i uruchomieniu kontenerów dostępne będą:
- REST API na localhost:3000
- Single Page Application (React.js) na localhost:3001
- Baza danych MYSQL na localhost:3306

Baza danych została wypełniona testowymi danymi.

Dostępne są 3 konta użytkowników:
- manager@test.com / test123 (rola manager, najwyższe uprawnienia)
- service-provider@test.com / test123 (rola service-provider, ograniczone uprawnienia)
- user@test.com / test123 (domyślna rola przydzielana po rejestracji użytkownika, brak uprawnień w panelu zarządzania)



### Definicja projektu:
Firma XXX jest firmą usługową której potrzebna jest aplikacja do zarządzania wycenami pracy wykonanej dla swoich klientów.

###### Chcemy pamiętać informacje o:
- użytkownikach oraz ich rolach (manager, service-provider, user)
- klientach
- adresach klientów 
- wycenach pracy (jaki dostawca usług gdzie pracował, dla jakiego klienta, jaką pracę wykonał i jaki jest jej koszt)

![Service Quotes ERD](https://user-images.githubusercontent.com/20664868/97700789-af23fb00-1aac-11eb-9664-0b3df6202530.png)

### TODO 
definicja projektu ✅  
statyczny wygląd aplikacji ✅  
react frontend ✅  
node backend ✅  
docker setup ✅  
