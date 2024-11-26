/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://just-new.com', // 사이트의 기본 URL
    generateRobotsTxt: true, // robots.txt 생성 여부
    sitemapSize: 5000, // 사이트 맵에 포함할 최대 URL 수
    changefreq: 'daily', // URL의 업데이트 빈도
    priority: 0.7, // 기본 우선 순위
  };
  