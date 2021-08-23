# 一个好的脚本习惯
set -euo pipefail
trap "echo 'error: Script failed: see failed command above'" ERR
