# Personal Site

Sito personale e portfolio di **Yintong Zhou**, software developer con sede a Milano.
Il progetto presenta il profilo professionale, le competenze tecniche e i collegamenti ai profili GitHub e LinkedIn.

## Stack tecnologico

- [.NET 8](https://dotnet.microsoft.com/)
- [Blazor Web App](https://learn.microsoft.com/aspnet/core/blazor/) con rendering lato server/SSR
- ASP.NET Core
- C# e Razor components
- Bootstrap 5 e Bootstrap Icons
- jQuery
- Font Rubik locale

L'applicazione è un progetto web SDK-style (`Microsoft.NET.Sdk.Web`) e non utilizza un backend applicativo o un database dedicato: i contenuti del portfolio sono definiti nei componenti Razor e negli asset statici.

## Funzionalità

- Home page con presentazione personale e contatto email
- Pagina About con esperienza, competenze, infrastruttura e formazione
- Copia dell'indirizzo email negli appunti tramite JavaScript
- Cambio del tema chiaro/scuro
- Metadati SEO e Open Graph per le pagine principali
- Privacy Policy e Cookie Policy
- Collegamenti esterni a GitHub e LinkedIn
- Layout responsive basato su Bootstrap

## Pagine disponibili

| Percorso | Descrizione |
| --- | --- |
| `/` | Presentazione e contatto |
| `/about` | Profilo professionale, esperienza e competenze |
| `/privacy` | Informativa privacy |
| `/cookie` | Informativa sui cookie |

## Prerequisiti

- [.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
- Un browser moderno
- Visual Studio 2022/2026 con il workload **ASP.NET e sviluppo web**, oppure la CLI `dotnet`

Per verificare l'SDK installato:

```powershell
dotnet --version
```

## Avvio in locale

Dalla directory radice del repository:

```powershell
dotnet restore .\personal-site\personal-site.csproj
dotnet run --project .\personal-site\personal-site.csproj
```

In alternativa, da Visual Studio è possibile avviare il progetto `personal-site` utilizzando uno dei profili configurati in `personal-site/Properties/launchSettings.json`.

Gli URL locali configurati sono:

- HTTP: `http://localhost:5125`
- HTTPS: `https://localhost:7074`
- IIS Express: disponibile tramite il profilo di Visual Studio

Per l'ambiente HTTPS locale, se necessario, installare e considerare attendibile il certificato di sviluppo .NET:

```powershell
dotnet dev-certs https --trust
```

## Build e pubblicazione

Per compilare il progetto:

```powershell
dotnet build .\personal-site\personal-site.csproj
```

Per creare gli artefatti di pubblicazione:

```powershell
dotnet publish .\personal-site\personal-site.csproj --configuration Release --output .\publish
```

La directory `publish` può essere distribuita su un ambiente compatibile con ASP.NET Core e .NET 8. La configurazione del provider di hosting e del dominio non è inclusa in questo repository.

## Struttura del progetto

```text
.
├── personal-site.sln
├── personal-site/
│   ├── App.razor                 # HTML radice e routing Blazor
│   ├── Program.cs                # Configurazione e pipeline ASP.NET Core
│   ├── Layout/                   # Layout, navigazione e componenti parziali
│   ├── Pages/                    # Pagine raggiungibili tramite route
│   ├── Properties/               # Profili di avvio locali
│   └── wwwroot/                  # CSS, JavaScript, immagini, font e librerie
└── README.md
```

Le librerie client distribuite localmente includono Bootstrap, Bootstrap Icons e jQuery. Le personalizzazioni grafiche si trovano in `personal-site/wwwroot/css/app.css`, mentre gli script del sito sono in `personal-site/wwwroot/js/site.js`.

## Contatti

- Email: [contactdm.yt@gmail.com](mailto:contactdm.yt@gmail.com)
- GitHub: [github.com/yintong-zhou](https://github.com/yintong-zhou)
- LinkedIn: [linkedin.com/in/yintong-zhou](https://www.linkedin.com/in/yintong-zhou/)

## Licenza

Il repository non contiene attualmente un file di licenza per il progetto. I componenti e le librerie distribuiti in `wwwroot/lib` e i font possono essere soggetti alle rispettive licenze upstream.
