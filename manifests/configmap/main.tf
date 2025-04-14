resource "kubernetes_config_map_v1" "nestjs_template_config_map" {
  metadata {
    name = "nestjs-template"
    namespace = "templates"
  }

  data = {
    DATABASE_NAME = "postgres"
    DATABASE_USER = "postgres"
    DATABASE_SCHEMA = "public"
    PORT = 4000
  }
}