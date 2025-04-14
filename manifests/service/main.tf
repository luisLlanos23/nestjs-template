resource "kubernetes_service_v1" "nestjs_template_service" {
  metadata {
    name      = "nestjs-template"
    namespace = "templates"
  }
  spec {
    selector = {
      app = "nestjs-template"
    }
    type             = "NodePort"
    session_affinity = "None"
    session_affinity_config {
      client_ip {
        timeout_seconds = 10800
      }
    }
    port {
      port      = 4000
      node_port = 30030
      protocol  = "TCP"
    }
  }
}