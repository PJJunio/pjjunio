import type { Lang } from './utils';

export function getFacts(lang: Lang) {
  return [
    { value: '25+', label: lang === 'pt' ? 'módulos no SIAS' : 'modules in SIAS' },
    { value: '5', label: lang === 'pt' ? 'sistemas entregues' : 'systems shipped' },
    { value: '2', label: lang === 'pt' ? 'stacks em produção' : 'stacks in production' },
    { value: 'CI/CD', label: lang === 'pt' ? 'em todo projeto novo' : 'on every new project' },
  ];
}

export function getAboutRows(lang: Lang) {
  const rows =
    lang === 'pt'
      ? [
          'Arquitetura em camadas por domínio',
          'API REST · JWT · MFA · RBAC',
          'Java 25 · Spring Boot 4 · PHP 8.2 · Symfony 7',
          'PostgreSQL · MySQL · Redis · Flyway',
          'Docker · SonarQube · Actuator · CI/CD',
          'Engenharia de Software — UNINTER (cursando)',
        ]
      : [
          'Domain-driven layered architecture',
          'REST API · JWT · MFA · RBAC',
          'Java 25 · Spring Boot 4 · PHP 8.2 · Symfony 7',
          'PostgreSQL · MySQL · Redis · Flyway',
          'Docker · SonarQube · Actuator · CI/CD',
          'Software Engineering — UNINTER (in progress)',
        ];

  return rows.map((text, i) => ({ n: String(i + 1).padStart(2, '0'), text }));
}

export function getSkillGroups(lang: Lang) {
  const labels =
    lang === 'pt'
      ? ['Linguagens', 'Frameworks', 'Banco de dados', 'DevOps & Infra', 'Segurança', 'Ferramentas']
      : ['Languages', 'Frameworks', 'Databases', 'DevOps & Infra', 'Security', 'Tools'];

  const items = [
    ['Java 25', 'PHP 8.2'],
    ['Spring Boot 4', 'Spring Security', 'Symfony 7.3', 'Doctrine ORM'],
    ['PostgreSQL 17', 'MySQL 8', 'Redis', 'Flyway'],
    ['Docker', 'GitHub Actions', 'CI/CD', 'SonarQube', 'Spring Actuator'],
    ['JWT', 'MFA', 'RBAC'],
    ['Git', 'Maven'],
  ];

  return labels.map((label, i) => ({ label, items: items[i] }));
}
