terraform {
  backend "s3" {
    bucket         = "backend-fiap"
    key            = "lambda-clients/terraform.tfstate"
    region         = "us-east-2"
    
  }
}
