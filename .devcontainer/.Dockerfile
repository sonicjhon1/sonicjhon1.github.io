FROM archlinux

RUN yes | pacman -Syu sudo
RUN useradd -m sonicj && usermod -L sonicj
RUN echo "sonicj ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN echo "root ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN yes | pacman -S --needed git base-devel 

USER sonicj
RUN sudo chmod -R a+rwX,o-w /home/sonicj
RUN git clone https://aur.archlinux.org/yay.git /home/sonicj/yay && cd /home/sonicj/yay && makepkg -si --noconfirm
RUN yay -S python-pip dotdrop-git --noconfirm
RUN git clone https://github.com/sonicjhon1/sonicj-dotfiles /home/sonicj/sonicj-dotfiles
RUN cd /home/sonicj/sonicj-dotfiles && dotdrop install -p "SONICJ-LCV"
