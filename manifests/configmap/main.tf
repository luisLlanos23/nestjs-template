resource "kubernetes_config_map_v1" "nestjs_template_config_map" {
  metadata {
    name      = "nestjs-template"
    namespace = "templates"
  }

  data = {
    DATABASE_NAME   = "${var.env_vars.DATABASE_NAME}"
    DATABASE_USER   = "${var.env_vars.DATABASE_USER}"
    DATABASE_SCHEMA = "${var.env_vars.DATABASE_SCHEMA}"
    PORT            = 4000
  }
}