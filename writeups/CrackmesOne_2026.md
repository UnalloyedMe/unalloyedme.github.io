# Crackmes.one Reverse Engineering CTF 2026
Here is the writeups for 2026 Crackmes.one ctf !! Let's how far I can get !!

## Table of Contents
- [CryptPad](#cryptpad)

## CryptPad
Here we have an app that encrypts input into a file, or decrypts files into texts. With it there is a flag.enc file that I guess we'll have to decrypt the app. The first thing we gonna do is of course try the "file -> decrypt" button and here is the result :
![App screenshot](img/CryptPad-1.png)
So it's quite obvious here that we'll have to patch the binary to force it to decrypt our file. The last thing to notice before starting our analysis is the different strings displayed after we click the other buttons like *register* which displays :
![Register button display](img/CryptPad-2.png)
Now we start the analysis !! Upon enter Ghidra, we only see a few functions and the *entry* that doesn't leave much information, apart from the window creation itself. But by searching for the string we find the strings we saw earlier, among others :
![Strings](img/CryptPad-3.png)
But how come we didn't see them while going through the functions Ghidra found ? Easy ! It means either there's no direct reference to the handler function or Ghidra couldn't define it as a function for some reason. To check that, we juste have to click on the cross reference of the error string and ... here we are ! An undefined function by Ghidra ! We name it buttons and we start analysing it :
```C
int buttons(HWND param_1,UINT param_2,uint param_3,LPARAM param_4)

{
  int iVar1;
  HWND pHVar2;
  uint uVar3;
  
                    /* "Exit" option */
  if (param_2 == 2) {
exit:
    PostQuitMessage(0);
    iVar1 = 0;
  }
  else {
    if (param_2 == 0x111) {
      uVar3 = param_3 & 0xffff;
      if (uVar3 == 0x65) {
        SendMessageA(DAT_004024d1,0xc,0x40211b,0);
        FUN_00401790();
        SetWindowTextA((HWND)DAT_0040248d,s_CryptPad_0040211b);
        DAT_00402200 = 0;
        return 0;
      }
                    /* "About" option */
      if (uVar3 == 0x70) {
        iVar1 = MessageBoxA(DAT_004024d5,about_msg,s_CryptPad_0040211b,0);
        return iVar1;
      }
                    /* "Register" option */
      if (uVar3 == 0x6f) {
        iVar1 = MessageBoxA(DAT_004024d5,register_msg,s_CryptPad_0040211b,0);
        return iVar1;
      }
                    /* "Decrypt" option */
      if (uVar3 == 0x66) {
        iVar1 = errorMsgbox();
        return iVar1;
      }
                    /* "Encrypt" option */
      if (uVar3 == 0x67) {
        iVar1 = getFile(DAT_004024d5);
        if (iVar1 == 0) {
          return 0;
        }
        SetWindowTextA(DAT_004024d5,&DAT_00402200);
        writeFile();
        return 0;
      }
      if (uVar3 == 0x69) goto exit;
    }
    else if (param_2 == 1) {
      pHVar2 = CreateWindowExA(0x200,&DAT_00402154,(LPCSTR)0x0,0x50200044,0,0,700,500,param_1,
                               (HMENU)0x0,DAT_0040248d,(LPVOID)0x0);
      if (pHVar2 == (HWND)0x0) {
        return 0;
      }
      DAT_004024d1 = pHVar2;
      DAT_004024d9 = CreateFontA(0x12,0,0,0,400,0,0,0,0,5,0,2,1,s_Comic_Sans_004021f1);
      if (pHVar2 != (HWND)0x8675309) {
        _DAT_00403569 = SendMessageA(DAT_004024d1,0x30,(WPARAM)DAT_004024d9,0);
        _DAT_0040356d = _DAT_00403569;
        return 0;
      }
      return 0x867530a;
    }
    iVar1 = DefWindowProcA(param_1,param_2,param_3,param_4);
  }
                    /* "Exit" option */
  return iVar1;
}
```
We can easily see that it is but a mere handler for the different buttons and inputs the app can take. We can easily our erroMsgbox() (the *decrypt* error) and the others strings that can be displayed.