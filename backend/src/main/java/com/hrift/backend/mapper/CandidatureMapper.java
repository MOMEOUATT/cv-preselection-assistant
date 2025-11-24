package com.hrift.backend.mapper;

import com.hrift.backend.dto.CandidatureDTO;
import com.hrift.backend.entities.Candidature;

import java.util.List;
import java.util.stream.Collectors;

public class CandidatureMapper {

    public static CandidatureDTO toDTO(Candidature c) {
        if (c == null) return null;

        return new CandidatureDTO(
                c.getOfferTitle(),
                c.getOfferLocation(),
                c.getOfferEnterprise(),
                c.getExp(),
                c.getCvName(),
                c.getScore(),
                c.getCvSkills(),
                c.getCreatedAt()
        );
    }

    public static List<CandidatureDTO> toDTOList(List<Candidature> candidatures) {
        return candidatures.stream().map(CandidatureMapper::toDTO).collect(Collectors.toList());
    }

}
