terraform {
  backend "s3" {
    bucket         = "backend-projeto"
    key            = "lambda-clients/terraform.tfstate"
    region         = "us-east-2"
    
  }
}
