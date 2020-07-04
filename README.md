# pi\_dj

*Tips, configs and skins for DJ-ing using open source DJ software, a raspberry pi and a controller.*


## Disclaimer

This is not a hack, it's a feature and thus pretty straightforward, why didn't I think about it before? Hopefully this repository will save someone, including myself a trip to Reddit trying to dig up i3 documentation.

This guide assumes you know your way around Linux and Mixxx DJ software. Furthermore it is highly specific to my hardware setup. Your mileage my vary depending on your hardware.

This IS a weekend project and not adhering to any of Mixxx's standards of documentation using out of the box hard and software without much optimization.



## Prerequisites

This guide assumes a lot, amongst others the following config:

* [Raspberry Pi 3 Model B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) with proper power supply (original 2.0A power brick)
* Optionally, for extra portability, it's possible to power the setup with a PROPER powerbank (See below).
* [Raspberry Pi OS (Buster) with Desktop](https://www.raspberrypi.org/downloads/raspberry-pi-os/) (I skipped the 'and recommended software' because I want a file manager but not OpenOffice, I'm not gonna do accounting on this machine.)
* Micro SD card to put the OS on.
* Some screen for your Raspberry Pi ([I am using this one](https://learn.adafruit.com/adafruit-2-8-pitft-capacitive-touch))
* A Midi controller for  your djing pleasure, this could be anything really,  but I have had better results with controllers sporting built in audio-cards. External (usb) audio cards just eat up precious current from your power suppy. In my setup I use a [Akiyama Pulsar](https://es.virtualdj.com/img/225189/95079/hwp_akiyama_akiyamapulsar.png) (some white label clone hardware).


## Demo

[Here](https://youtu.be/UZam2aeX3Nc) (Youtube).

## Install

### OS

This install assumes you want to boot Mixxx as soon as you power your Raspberry Pi and you want the i3 tiled window manager.

* Install on a micro SD card [Raspberry Pi OS (Buster) with Desktop](https://www.raspberrypi.org/downloads/raspberry-pi-os/)

* Boot, open terminal and update your system:
> sudo apt-get update && sudo apt-get upgrade


### Screen

* Make your screen work. For ([me](https://learn.adafruit.com/adafruit-2-8-pitft-capacitive-touch)) this was super easy following the guide and running the script [here](https://learn.adafruit.com/adafruit-2-8-pitft-capacitive-touch/easy-install-2). Setup in 'hdmi mirror' config makes it a breeze to hook up a full size screen albeit with the same (low) resolution.
* Set your desired resolution at the bottom of: /boot/config.txt (the default 640x480 is best for my screen but on 800x600 text is still readable).

### Power

For installation I would suggest powering your setup using the original Raspberry Pi power brick (mine is rated at 2.0A). This allows you to hook-up a mouse, keyboard and not run into power issues. For the sake of portability it would be nice to run the setup with some sort of battery. My 2.1A rated USB Powerbank...did not deliver. Another one, branded 'pisen', rated at 2.0A DID work out. I modified it (according to Huaqiangbei standards) to include an analog Amp meter. This displayed a questionable peak current draw of 1.1A  (see below) with an extra RGB keyboard attached, at which point the undercurrent icon appeared on the screen. It performed fine without the extra keyboard.

![current draw](https://github.com/dennisdebel/pi_dj/blob/master/images/current-draw.jpg)

### Mixxx

* Install Mixxx (2.2.0 as of writing)

	> sudo apt-get install mixxx

* Install your midi controller's mapping (copy to: ~/.mixxx/controllers/)
* Install a skin suitable for your screen (copy to: /usr/share/mixxx/skins root access needed). A minimal example (LateNightMinimal800x480) is provided in this repository.

*Note: midi learning while clicking elements on the skin doesn't work anymore, since I simply deleted most elements.*

### Window manager (optional)

* Install i3 window manager

	> sudo apt-get install i3

At this point make sure your system is up-to-date, your screen is working and Mixxx is installed. You might want to hook up your controller, launch Mixxx and play around a bit. Set up your midi mapping, sound card and what not. If you are ready to make the plunge into tiled window managers you should continue, I believe in you (otherwise the [documentation](https://i3wm.org/docs/userguide.html) will).

To replace the default xfce/lightdm window manager edit the ~/.dmrc file (see the example included in the source code). And replace the session line with the following:

>  session = i3


Reboot!

> sudo reboot

You will be greeted by the i3 config window, allowing you to choose a 'super' or mod key for your i3 keyboard shortcuts.

### Auto run

To automatically start Mixxx on startup, in full screen, edit the i3 config file located at: ~/.confid/i3/config (see example in this repo).

There is a strange bug where the mixxx window seems to loose focus when auto running on boot, disabling interaction through your controller. This only happens every so often though. I tried to solve this by launching Mixxx 'floating'. But the bug persists. Even stranger is that the window will go full screen anyway, while keeping focus.

### Done!

Now copy, analyze your library and go play!



## Notes

### Mixxx Skin

The provide skin 'LateNightMinimal800x480' is based on the default LateNight resizable skin provided with modern builds of Mixxx. I simply deleted most of the elements and made the elements with minimal size, expandable: Size policy (e,e). There is a horizontal ruler dividing the waveform and the track name, you can drag it down using the mouse cursor to create more space for the waveform.

### Midi mapping

The mapping provided is particular to my controller and contains many bugs but it sorta works for me. I mainly used the midi learn wizard on the original LateNight skin to map my buttons and sliders. The jog wheels are scripted in javascript based on the mapping for the iDJ iCON found [here](https://github.com/kfigiela/Mixxx-iCON-iDJ).

### Bugs

 * The default wave form display doesn't work, play around/choose different renderings and it will work!

 * The default bpm analysing engine does seem to produce some weird results, worse than older Mixxx versions, be warned.

 * Mixxx 'loses focus' on auto run some times, this prevents you from scrolling trough the Mixxx library using a rotary encoder. Not sure of this is my mapping, mixxx or i3...

 * You want to plug in your controller before starting Mixxx, otherwise Mixx will just hang/crash.

* Both the skin (small fonts in library) and mapping (jog wheels) need work to be fully practical.

* You might need to run Mixxx first before copying skins.

* No way to shutdown gracefully yet. You might want to add a button or hostap/ssh access.


## Motivation

My parts-bin had accumulated a critical mass. Critical in both practical/physical fashion as well as conceptual sense. The market for digital dj setups is exploding (assumption). Companies are churning out platforms and hardware that are obsolete as soon as they're released (it seems). Combine that with vendor lock-ins, proprietary software, databases and algorithms and you have a perfect storm of 'why you should stick to vinyl'. Though, with the advent of affordable and powerful single board computers like the Raspberry Pi and the tremendous effort of open source software projects like Mixxx, it seems to be actually possible to just play your hard earned mp3s on a system that doesn't consume them into oblivion like propitiatory platforms such as iTunes and Pioneer's RecordBox. This is not a random first attempt, but a continuation of the collective effort to pay homage to artist by playing their music, independent of corporate quirks (...).


## Caveats

Many

## Copyright

* Files `mixxx/skin/LateNightMinimal800x480/*` are distributed under [CC-BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), see [skin.xml](mixxx/skin/LateNightMinimal800x480/skin.xml).
* Files `mixxx/controller/Akiyama_Pulsar.midi.js` and `mixxx/controller/Akiyama_Pulsar.midi.xml` are distributed under GPL-2+, as they are based on Mixxx original code.
* All other files can be distributed under ???
