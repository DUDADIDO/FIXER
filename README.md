## 🛠 Tech Stack

### 🎨 Frontend
| Category | Technology |
| :--- | :--- |
| **Library** | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=Tailwind-CSS&logoColor=white) |
| **Package Manager** | ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) |

### ⚙️ Backend & Infrastructure
| Category | Technology |
| :--- | :--- |
| **Framework** | ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=Spring-Boot&logoColor=white) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white) |
| **Infrastructure** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white) |

---

### 🏗 Architecture
graph TD
    subgraph "External Access"
        User((User))
    end

    subgraph "Docker Container Environment (app-network)"
        direction TB
        NGINX[Nginx Container<br/>Port 15018]
        
        subgraph "Frontend"
            FE[React Frontend<br/>Static Files]
        end

        subgraph "Backend"
            BE[Spring Boot<br/>Java 21]
        end

        subgraph "Database"
            DB[(MySQL 8.0)]
        end

        %% Connections
        User -->|Request| NGINX
        NGINX -->|/| FE
        NGINX -->|/api/| BE
        BE -->|JPA/JDBC| DB
    end

    style NGINX fill:#009639,stroke:#fff,color:#fff
    style FE fill:#61DAFB,stroke:#333,color:#000
    style BE fill:#6DB33F,stroke:#fff,color:#fff
    style DB fill:#4479A1,stroke:#fff,color:#fff
    style NGINX stroke-width:2px