# auth-server

## Setup Commands

- Disable automatic nginx loading
`sudo systemctl disable nginx`
- Allow nodejs to run on port 80
`sudo apt install libcap2-bin`
`sudo setcap cap_net_bind_service=+ep /path/to/node`
*The path to node can be found using `which node`*
