FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["CrypticChat.Api/CrypticChat.Api.csproj", "CrypticChat.Api/"]
COPY ["CrypticChat.Application/CrypticChat.Application.csproj", "CrypticChat.Application/"]
COPY ["CrypticChat.Persistance/CrypticChat.Persistance.csproj", "CrypticChat.Persistance/"]
COPY ["CrypticChat.Domain/CrypticChat.Domain.csproj", "CrypticChat.Domain/"]
RUN dotnet restore "CrypticChat.Api/CrypticChat.Api.csproj"
COPY . .
WORKDIR "/src/CrypticChat.Api"
RUN dotnet build "CrypticChat.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CrypticChat.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CrypticChat.Api.dll"]