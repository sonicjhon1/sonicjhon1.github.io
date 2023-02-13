FROM archlinux

RUN yes | pacman -Syu sudo fish
RUN yes | pacman -S --needed git base-devel 
RUN useradd -m sonicj && usermod -L sonicj -s /bin/fish
RUN echo "sonicj ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN echo "root ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

USER sonicj
RUN sudo chmod -R a+rwX,o-w /home/sonicj
RUN git clone https://aur.archlinux.org/yay.git /home/sonicj/yay && cd /home/sonicj/yay && makepkg -si --noconfirm
RUN yay -S dotdrop-git --noconfirm
RUN git clone https://github.com/sonicjhon1/sonicj-dotfiles /home/sonicj/sonicj-dotfiles
RUN cd /home/sonicj/sonicj-dotfiles && dotdrop install -p "SONICJ-LCV"

RUN yay -S starship find-the-command nodejs npm --noconfirm
