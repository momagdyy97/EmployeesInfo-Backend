# main.tf
resource "aws_instance" "zomool_app" {
  ami           = "ami-0a94db0f368acc55b"  # AMI ID for Zomool-App
  instance_type = "t3.medium"              # Instance type for Zomool-App

  tags = {
    Name = "Zomool-App"                    # Tagging the instance as Zomool-App
  }

  key_name = "Linux-VM-key7"               # Replace with your actual SSH key pair name
}
output "instance_ip" {
  value = aws_instance.zomool_app.public_ip # Dynamically fetch the IP address
}
