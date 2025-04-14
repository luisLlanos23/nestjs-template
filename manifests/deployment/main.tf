resource "kubernetes_deployment_v1" "nestjs_template_deployment" {
  timeouts {
    create = "3m"
    update = "3m"
    delete = "3m"
  }
  metadata {
    name = "nestjs-template"
    namespace = "templates"
    labels = {
      app = "nestjs-template"
    }
  }
  spec {
    revision_history_limit = 5
    selector {
      match_labels = {
        app = "nestjs-template"
      }
    }
    template {
      metadata {
        name = "nestjs-template"
        labels = {
          app = "nestjs-template"
        }
      }
      spec {
        container {
          name = "nestjs-template"
          image = "luisllanos/nestjs-server-template:latest"
          image_pull_policy = "Always"

          env {
            name = "NODE_IP"
            value_from {
              field_ref {
                field_path = "status.hostIP"
              }
            }
          }
          env {
            name = "DATABASE_HOST"
            value = "http://$(NODE_IP)"
          }
          env {
            name = "DATABASE_PORT"
            value = 30000
          }
          env {
            name = "DATABASE_PASSWORD"
            value = var.env_vars.DATABASE_PASSWORD
          }
          env {
            name = "RUN_MIGRATIONS"
            value = var.env_vars.RUN_MIGRATIONS
          }
          env {
            name = "SECRET_TOKEN"
            value = var.env_vars.SECRET_TOKEN
          }
          env_from {
            config_map_ref {
              name = "nestjs-template"
            }
          }
          resources {
            requests = {
              memory = "500Mi"
            }
          }
          port {
            container_port = 4000
          }
        }
      }
    }
  }
}